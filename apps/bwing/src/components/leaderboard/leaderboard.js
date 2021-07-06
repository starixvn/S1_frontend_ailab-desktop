import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import {
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";
import bottomImgResult from "../../styles/img/ranking/bottomImg.png";
import moneyImgResult from "../../styles/img/ranking/money.png";
import LeaderBoardTab from "./leaderboard.tabs";
import {
	defTabId,
	defDayNum,
	defPeriodList,
	defRewardList,
	defPeriodId,
	defRewardTabId
} from "./leaderboard.def";
import ContentEvent from "./leaderBoard.content.event";
import Content from "./leaderBoard.content";
import tropyBgImg from "../../styles/img/ranking/tropyBg.png";
import config from "../../config";

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
	const [periodId, setPeriodId] = useState(null);
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		} else if (Today < new Date(defPeriodList[3].endDate)) {
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

	const onChangeDays = _days => {
		setBeforeDays(_days);
		getLeaderboardData(periodId, _days, tab);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const showErrorPopBox = errMessage => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			message: errMessage,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={ClickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const changeRewardTab = _tab => {
		setRewardTab(_tab);
	};

	const onChangePeriod = (_periodId, _tabId) => {
		setPeriodId(_periodId);
		getLeaderboardData(_periodId, beforeDays, _tabId);
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

		await api_events_GetLeaderboardListV2(payload).then(async res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					const topArr = res.data.data;

					const userInTop =
						topArr.findIndex(
							r => r.username === userInfo.userName
						) !== -1;

					if (!topArr || topArr.length === 0) {
						setRankingData([]);
					} else if (userInTop) {
						setRankingData(topArr);
					} else {
						const selfItem = await api_events_GetCustRankV2({
							LBCategoryId: payload.lBCategoryId,
							BeforeDays: payload.BeforeDays,
							EventCode: payload.EventCode
						}).then(resRank => {
							if (resRank.data.errorCode === 0) {
								return {
									userName: userInfo.userName,
									wTurnover: resRank.data.data.point,
									custRank:
										resRank.data.data.custRank === 0 ||
										resRank.data.data.custRank > 999
											? "999+"
											: resRank.data.data.custRank
								};
							}
							return showErrorPopBox(resRank.data.message);
						});
						const filterRepeatArr = topArr.filter(
							r => r.username !== userInfo.userName
						);
						const concatArr = [...filterRepeatArr, selfItem];
						setRankingData(concatArr);
					}
				} else {
					showErrorPopBox(res.data.message);
				}
			}
		});
	};

	const linkToTnc = () => {
		window.open(
			`${config.t_and_cURL}/SiteSkin/${config.siteName}/Ranking/UEFAEuro-${userInfo.langId}.html`
		);
	};

	const useUpperCase = _text => {
		return _text.toUpperCase();
	};

	return (
		<section className="rankingNew baskballBg">
			<img
				className="bottomImg"
				alt="readerboard-buttom-img"
				src={bottomImgResult}
			/>
			<div className="rankContent">
				<LeaderBoardTab
					t={t}
					onChangeTab={onChangeTab}
					tab={tab}
					useUpperCase={useUpperCase}
				/>
				<div className="rankBox">
					{tab === defTabId.first ? (
						<ContentEvent
							t={t}
							tab={tab}
							rewardList={rewardList}
							userInfo={userInfo}
							rewardTab={rewardTab}
							changeRewardTab={changeRewardTab}
							linkToTnc={linkToTnc}
						/>
					) : (
						<Content
							t={t}
							tab={tab}
							rewardList={rewardList}
							userInfo={userInfo}
							rankingData={rankingData}
							onChangeDays={onChangeDays}
							periodId={periodId}
							beforeDays={beforeDays}
							onChangePeriod={onChangePeriod}
							showUpdateTime={showUpdateTime}
							defTopNum={defTopNum}
						/>
					)}

					<RankInBoxRight
						tab={tab}
						t={t}
						rewardList={rewardList}
						periodId={periodId}
					/>
				</div>
			</div>
		</section>
	);
};

const RankInBoxRight = ({ tab, t, rewardList, periodId }) => {
	if (tab === defTabId.first)
		return (
			<div className="rankInBox rankInBox2">
				<div className="textBox">
					<h1>
						{t("lbl_leaderboardTitle_1")}
						<br />
						{t("lbl_leaderboardTitle_2")}
					</h1>
				</div>
				<img src={moneyImgResult} alt="reward" />
			</div>
		);

	const currentStartMonth = defPeriodList[periodId].StartMonth;
	const currentEndMonth = defPeriodList[periodId].EndMonth;

	return (
		<div className="rankInBox rankInBox2">
			<div className="textBox">
				<div className="textBox">
					{tab === defTabId.third && (
						<p>
							* {t("lbl_Current_tournament_schedule")} : <br />
							13 {t(currentStartMonth)} 2021 ~ 12{" "}
							{t(currentEndMonth)} 2021
						</p>
					)}

					<h1>
						{t("lbl_No1_Reward")}
						<br />
						{rewardList[0].reward}
					</h1>
				</div>
			</div>
			<img src={tropyBgImg} alt="reward" />
		</div>
	);
};

RankInBoxRight.defaultProps = {
	periodId: null
};

RankInBoxRight.propTypes = {
	tab: PropTypes.number.isRequired,
	t: PropTypes.func.isRequired,
	rewardList: PropTypes.arrayOf(PropTypes.object).isRequired,
	periodId: PropTypes.number
};
