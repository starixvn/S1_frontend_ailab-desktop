import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import championImg from "../../styles/img/champion.png";
import {
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";
import LeaderBoardTab from "./leaderBoard.tabs";
import ButtonGroups from "./leaderBoard.btnGroups";
import {
	defTabId,
	// defBackground,
	defDayNum,
	defRewardList,
	// defLeaderBoardTitle,
	// defLastChampionReward,
	defPeriodId,
	defPeriodList,
	defEventTimeList
} from "./leaderBoard.def";
import { number_format } from "../common/common";
import EventTab from "./leaderBoard.eventTab";

const langMapping = {
	cs: "MYR",
	en: "MYR",
	id: "IDR",
	th: "THB"
};

const currMapping = {
	13: "MYR"
};

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [rankingData, setRankingData] = useState([]);
	const [tab, setTab] = useState(defTabId.event);
	const [buttonID, setButtonID] = useState(1);
	const [beforeDays, setBeforeDays] = useState(defDayNum.today);
	const defTopNum = 10;
	const isEventTab = tab === defTabId.event;

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	// console.log(currencyName);

	const rewardList = defRewardList({ t })[currencyName]
		? defRewardList({ t })[currencyName][0] // <--- need update
		: defRewardList({ t }).MYR[0]; // <--- need update

	// console.log(defRewardList({ t }));

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getLeaderboardData();
		showUpdateTime();
	}, [userInfo.userName]);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setTab(defTabId.event);
		}
	}, [userInfo.isLogin]);

	const showUpdateTime = () => {
		const _time = new Date();
		const _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		const displayTime = moment(_time).format("YYYY/MM/DD hh:mm:ss");
		return displayTime;
	};

	useEffect(() => {
		getCurrentPeriod();
		// console.log(getCurrentPeriod());
		setButtonID(getCurrentPeriod());
	}, []);

	const getCurrentPeriod = () => {
		//  need update ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
		const today = new Date("2021/05/20");
		let result;
		Object.values(defPeriodList).forEach(item => {
			// console.log(today);

			// console.log("start", new Date(item.startDate));
			// console.log("end", new Date(item.endDate));

			// console.log("start?", today > new Date(item.startDate));
			// console.log("end?", today < new Date(item.endDate));

			if (
				today > new Date(item.startDate) &&
				today < new Date(item.endDate)
			) {
				// console.log("ANSWER::", item.id);
				result = item.id;
			}
		});
		return result;
	};

	const onChangeButton = (_buttonID, _tabId) => {
		// console.log("_buttonID:", _buttonID, "/ _tabId:", _tabId);
		setButtonID(_buttonID);
		getLeaderboardData(_buttonID, beforeDays, _tabId);
	};

	const onChangeDays = _days => {
		console.log("_days::", _days);
		setBeforeDays(_days);
		getLeaderboardData(buttonID, _days, tab);
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const onChangeTab = tabId => {
		if (tabId !== defTabId.event && !userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		} else {
			const cleanButtonId = () => setButtonID(buttonID);
			const cleanBeforeDay = () => setBeforeDays(defDayNum.today);
			const getDefaultData = () =>
				getLeaderboardData(defPeriodId.period1, defDayNum.today, tabId);
			setTab(tabId);
			if (tabId === defTabId.event) {
				cleanButtonId();
				cleanBeforeDay();
				// don't get data
			} else if (tabId === defTabId.second) {
				cleanButtonId();
				cleanBeforeDay();
				getDefaultData();
			} else if (tabId === defTabId.third) {
				cleanButtonId();
				cleanBeforeDay();
				getDefaultData();
			} else {
				cleanButtonId();
				setBeforeDays(defDayNum.yesterDay);
				getDefaultData();
			}
		}
	};

	// ■■■■■■■■■■■■■■■■■ api ■■■■■■■■■■■■■■■■■■■■■■■■
	// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
	const getLeaderboardData = (_buttonID, _days, _tabId) => {
		if (!userInfo.isLogin) return;
		// console.log("_tabId-", _tabId);
		// console.log("tab-", tab);
		if (_tabId === defTabId.event) return;
		// console.log(_buttonID, "--", _days, "--", _tabId);
		const currentButtonId = _buttonID ?? buttonID;

		const payload = {
			lBCategoryId: 0,
			TopNum: defTopNum,
			BeforeDays: _days ?? beforeDays,
			EventCode: defPeriodList[currentButtonId].eventCode
		};

		console.log("payload--", payload);

		const GetRankDatas = async () => {
			await api_events_GetLeaderboardListV2(payload).then(res => {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;

					if (rankDatas?.length > 0) {
						api_events_GetCustRankV2({
							LBbuttonId: payload.lBbuttonId,
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
							} else {
								openErrorMessagePopBox(
									resRank.data.message,
									resRank.data.errorCode
								);
							}
						});
					} else {
						setRankingData([]);
					}
				} else {
					openErrorMessagePopBox(
						res.data.message,
						res.data.errorCode
					);
				}
			});
		};
		GetRankDatas();
	};

	const openErrorMessagePopBox = (message, errorCode) => {
		setPopBox({
			message: message ?? t("msg_ApiServerError"),
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	// console.log("tab--> ", tab);

	const innerTopLayout = () => {
		if (tab === defTabId.second) {
			return (
				<>
					<div className="rankTag">
						<div>Tournament</div>
						<ButtonGroups
							t={t}
							onChangeButton={onChangeButton}
							buttonID={buttonID}
							onChangeDays={onChangeDays}
							beforeDays={beforeDays}
							tab={tab}
						/>
					</div>
					<button className="finalTour">EURO 2020 FINAL</button>
				</>
			);
		}
		if (tab === defTabId.third) {
			return <div className="txt">SPORTS , LIVE CASINO & SLOTS</div>;
		}
		if (tab === defTabId.fourth) {
			return (
				<div className="rankTag">
					<div>Date</div>
					<ButtonGroups
						t={t}
						onChangeButton={onChangeButton}
						buttonID={buttonID}
						onChangeDays={onChangeDays}
						beforeDays={beforeDays}
						tab={tab}
					/>
				</div>
			);
		}
	};

	return (
		<section className="ranking">
			<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
			{isEventTab ? (
				<EventTab
					t={t}
					// onChangeButton={onChangeButton}
					buttonID={buttonID}
					tab={tab}
					rewardList={rewardList}
					userInfo={userInfo}
					currencyName={currencyName}
				/>
			) : (
				<div
					className={
						tab === defTabId.second
							? "lastevent active"
							: "champion active"
					}>
					{innerTopLayout()}
					<div className="highest">
						{tab === defTabId.third ? (
							<div>
								* Current tournament schedule: 13 Apr 2021 ~ 12
								May 2021
							</div>
						) : null}
						<img src="https://image.n88media.com/SiteSkin/img/champion.png" />
						<div className="mwt_border">
							<span className="arrow_t_int" />
							<span className="arrow_t_out" />
							<div>HIGHEST WINNING RECORD</div>
							<div>(Last 7 Days) ******kboy</div>
							<div className="txt-yellow">MYR 10,000,000.00</div>
						</div>
					</div>
					<div className="rankModule">
						{rankingData?.length > 0 ? (
							<div className="rankList">
								<ul>
									<li>
										<div>{t("lbl_Ranking")}</div>
										<div>{t("lbl_Username")}</div>
										<div>{t("lbl_Points")}</div>
									</li>
									<Ranking RankingDatas={rankingData} />
								</ul>
							</div>
						) : (
							<div className="icon icon-nodata">
								{t("lbl_NoData")}
							</div>
						)}
						{tab === defTabId.second ? null : (
							<div className="lastUpdate">
								{t(`lbl_LastUpdTime`, {
									time: showUpdateTime()
								})}
							</div>
						)}
					</div>
				</div>
			)}
		</section>
	);
};

const Ranking = ({ RankingDatas }) =>
	RankingDatas?.map((item, idx) => {
		const { rank } = item;
		return (
			<li
				key={`leaderboard_item_${item.userName}`}
				className={rank ? "userRank" : null}>
				<div>
					{idx < 3 ? (
						<img
							src={require(`../../styles/img/no${idx + 1}.png`)}
							alt="ranking_top_three"
						/>
					) : (
						<img
							src={require(`../../styles/img/gold.png`)}
							alt="ranking_gold"
						/>
					)}
					{rank || idx + 1}
				</div>
				<div>{item.userName}</div>
				<div>{number_format(item.wTurnover)}</div>
			</li>
		);
	});
