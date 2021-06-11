import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import {
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";

import {
	defTabId,
	defDayNum,
	defRewardList,
	defPeriodList,
	defPeriodId,
	defRewardTabId
} from "./leaderboard.def";

import LeaderBoardTabs from "./leaderboard.tabs";
import ContentEvent from "./leaderBoard.content.event";
import Content from "./leaderBoard.content";

const langMapping = {
	vn: "VND",
	en: "VND"
};

const currMapping = {
	15: "VND"
};

const Today = new Date();
const defLBCategoryId = 0;
const defTopNum = 10;

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [rankingData, setRankingData] = useState([]);
	const [tab, setTab] = useState(defTabId.first);
	const [rewardTab, setRewardTab] = useState(defRewardTabId.final);
	const [periodId, setPeriodId] = useState(defPeriodId.period2);
	const [beforeDays, setBeforeDays] = useState(defDayNum.today);

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	const rewardList = defRewardList({ t })[currencyName]
		? defRewardList({ t })[currencyName][rewardTab]
		: defRewardList({ t }).VND[rewardTab];

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getRealTiimePeriod();
		getLeaderboardData();
		showUpdateTime();
	}, [userInfo.userName]);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setTab(defTabId.first);
		}
	}, [userInfo.isLogin]);

	const showUpdateTime = () => {
		const _time = new Date();
		const _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		const displayTime = moment(_time).format("YYYY/MM/DD HH:mm:ss");
		return displayTime;
	};

	const getRealTiimePeriod = () => {
		let result = defPeriodId.period4;

		if (Today < new Date(defPeriodList[2].startDate)) {
			result = defPeriodList[2].id;
		} else if (Today > new Date(defPeriodList[3].endDate)) {
			result = defPeriodList[3].id;
		} else {
			Object.values(defPeriodList)
				.filter(pd => pd.id !== defPeriodId.period4)
				.forEach(pd => {
					if (
						Today > new Date(pd.startDate) &&
						Today < new Date(pd.endDate)
					) {
						result = pd.id;
					}
				});
		}

		setPeriodId(result);
		return result;
	};

	const onChangeTab = tabId => {
		const realTimePeriod = getRealTiimePeriod();

		if (tabId !== defTabId.first && !userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		} else {
			setTab(tabId);

			setPeriodId(realTimePeriod);
			setRewardTab(defRewardTabId.final);

			if (tabId === defTabId.first) {
				setBeforeDays(defDayNum.today);
			}

			if (tabId === defTabId.second || tabId === defTabId.third) {
				setBeforeDays(defDayNum.today);
				getLeaderboardData(realTimePeriod, defDayNum.today, tabId);
			}
			if (tabId === defTabId.fourth) {
				setBeforeDays(defDayNum.yesterDay);
				getLeaderboardData(realTimePeriod, defDayNum.yesterDay, tabId);
			}
		}
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = async (_periodId, _days, _tabId) => {
		if (!userInfo.isLogin) return;
		if (!_tabId || _tabId === defTabId.first) return;

		const currentperiodId = _periodId ?? periodId;

		const payload = {
			lBCategoryId: defLBCategoryId,
			TopNum: defTopNum,
			BeforeDays: _days ?? beforeDays,
			EventCode: defPeriodList[currentperiodId].eventCode
		};

		await api_events_GetLeaderboardListV2(payload).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;

					if (rankDatas?.length > 0) {
						api_events_GetCustRankV2({
							LBCategoryId: payload.lBCategoryId,
							BeforeDays: payload.BeforeDays,
							EventCode: payload.EventCode
						}).then(resRank => {
							if (resRank.data.errorCode === 0) {
								const { custRank, point } = resRank.data.data;

								setRankingData(() => {
									const rank =
										custRank > 999 || custRank === 0
											? "999+"
											: custRank;

									let result = [];
									if (
										custRank <= defTopNum &&
										custRank !== 0
									) {
										rankDatas[custRank - 1] = {
											...rankDatas[custRank - 1],
											userName: userInfo.userName,
											rank
										};
										result = rankDatas;
									} else {
										result = [
											...rankDatas,
											{
												userName: userInfo.userName,
												wTurnover: point,
												rank
											}
										];
									}
									return result;
								});
							}
						});
					} else {
						setRankingData([]);
					}
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: res.data.message,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		});
	};

	const changeRewardTab = _tab => {
		setRewardTab(_tab);
	};

	const onChangePeriod = (_periodId, _tabId) => {
		setPeriodId(_periodId);
		getLeaderboardData(_periodId, beforeDays, _tabId);
	};

	const onChangeDays = _days => {
		setBeforeDays(_days);
		getLeaderboardData(periodId, _days, tab);
	};

	const linkToTnc = () => {
		window.open(
			`${config.t_and_cURL}/SiteSkin/${config.siteName}/Ranking/${userInfo.langId}4.html`
		);
	};

	return (
		<main className="leaderboard">
			<section className="content">
				<LeaderBoardTabs t={t} onChangeTab={onChangeTab} tab={tab} />

				<div className="rightModule">
					{tab === defTabId.first ? (
						<ContentEvent
							t={t}
							tab={tab}
							rewardList={rewardList}
							userInfo={userInfo}
							changeRewardTab={changeRewardTab}
							rewardTab={rewardTab}
							linkToTnc={linkToTnc}
						/>
					) : (
						<Content
							t={t}
							tab={tab}
							periodId={periodId}
							rankingData={rankingData}
							beforeDays={beforeDays}
							rewardList={rewardList}
							onChangePeriod={onChangePeriod}
							onChangeDays={onChangeDays}
							showUpdateTime={showUpdateTime}
						/>
					)}
				</div>
			</section>
		</main>
	);
};
