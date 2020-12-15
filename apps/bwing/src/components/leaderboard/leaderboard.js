import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import bottomImg from "../../styles/img/ranking/bottomImg.png";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank
} from "../../service/api/events";
import LeaderBoardTab from "./leaderBoard.tabs";
import ButtonGroups from "./leaderBoard.btnGroups";
import {
	defTabId,
	defBackground,
	defDayNum,
	defTabDisplayKey,
	defRewardList,
	defLeaderBoardTitle
} from "./leaderboard.def";
import moment from "moment";
import { number_format } from "../common/common";
import EventTab from "./leaderboard.eventTab";

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
	const initSelfRankingData = {
		custRank: 0,
		point: 0
	};
	const [selfRankingData, setSelfRankingData] = useState(initSelfRankingData);
	const [tab, setTab] = useState(defTabId.event);
	const [beforeDays, setBeforeDays] = useState(defDayNum.yesterDay);
	const lBCategoryId = 0;
	const TopNum = 10;
	const isEventTab = tab === defTabId.event;

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	const rewardList = defRewardList[currencyName];

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getLeaderboardData();
		getSelfLeaderboardData();
		showUpdateTime();
	}, []);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setTab(defTabId.event);
		}
	}, [userInfo.isLogin]);

	const showUpdateTime = () => {
		let _time = new Date();
		let _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		let displayTime = moment(_time).format("YYYY/MM/DD hh:mm:ss");
		return displayTime;
	};

	const onChangeTab = tabValue => {
		// if (tabValue !== defTabId.event && !userInfo.isLogin) {
		// 	setPopBox({
		// 		isOpen: true,
		// 		popBoxType: defPopBoxType.Login
		// 	});
		// } else {
		setTab(tabValue);
		setBeforeDays(defDayNum.yesterDay);
		// }
	};

	const onChangeDays = daysValue => {
		setBeforeDays(daysValue);
		getLeaderboardData(daysValue);
		getSelfLeaderboardData(daysValue);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = async daysValue => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: lBCategoryId,
			TopNum: TopNum,
			BeforeDays: daysValue ?? beforeDays
		};

		await api_events_GetLeaderboardList(payload).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setRankingData(res.data.data);
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

	const getSelfLeaderboardData = async daysValue => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: lBCategoryId,
			BeforeDays: daysValue ?? beforeDays
		};

		await api_events_GetCustRank(payload).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setSelfRankingData(res.data.data);
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
		});fbottomImg
	};

	console.log("tab::", tab);

	return (
		<section className={`rankingPage ${defBackground[tab]}`}>
			{/* <img src={bottomImg} alt="bottomImg" /> */}
			<div className="ranContent">
				<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
				<div className="ranBox">
					{/* <EventTab
						t={t}
						tab={tab}
						rewardList={rewardList}
						userInfo={userInfo}
						currencyName={currencyName}
					/> */}
					<div className="ranInBox">
						<h1 class="title">TOP title</h1>
						{rankingData?.length > 0 ? (
							<div className="rankList">
								<ul>
									<li>
										<div>{t("lbl_Ranking")}</div>
										<div>{t("lbl_Username")}</div>
										<div>{t("lbl_Points")}</div>
									</li>
									<Ranking rankingData={rankingData} t={t} />
									<SelfRanking
										selfRankingData={selfRankingData}
										userInfo={userInfo}
									/>
								</ul>
							</div>
						) : (
							<div className="icon icon-nodata">
								{t("lbl_NoData")}
							</div>
						)}
						<div className="lastUpdate">
							{t(`lbl_LastUpdTime`, {
								time: showUpdateTime()
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const Ranking = ({ rankingData, t }) =>
	rankingData?.map((item, idx) => {
		return (
			<li
				key={`leaderboard_item_${item.custId}`}
				className={idx < 3 ? `no${idx + 1}` : null}>
				<div>
					{idx < 3 ? (
						<img
							src={require(`../../styles/img/ranking/trophy${
								idx + 1
							}.png`)}
							alt="ranking_top_three"
						/>
					) : null}
					{idx + 1}
				</div>
				<div>{item.userName}</div>
				<div className="point">{number_format(item.wTurnover)}</div>
			</li>
		);
	});

const SelfRanking = ({ selfRankingData, userInfo }) =>
	selfRankingData?.custRank > 0 ? (
		<li className="myRan">
			<div>
				{selfRankingData.custRank > 999
					? "999+"
					: selfRankingData.custRank}
			</div>
			<div>{userInfo.userName}</div>
			<div className="point">{selfRankingData.point}</div>
		</li>
	) : null;
