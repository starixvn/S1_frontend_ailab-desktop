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
import DayDropdown from "./leaderboard.dayDropdown";
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
	vn: "VND",
	en: "VND"
};

const currMapping = {
	15: "VND"
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
	const [beforeDays, setBeforeDays] = useState(defDayNum.today);
	const lBCategoryId = 0;
	const TopNum = 20;

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
		if (tabValue !== defTabId.event && !userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		} else {
			setTab(tabValue);
			setBeforeDays(
				tabValue === defTabId.records
					? defDayNum.yesterDay
					: defDayNum.today
			);
		}
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
		console.log("call getLeaderboardData");
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
		});
	};

	return (
		<section className={`rankingPage ${defBackground[tab]}`}>
			{/* <img src={bottomImg} alt="bottomImg" /> */}
			<div className="rankContent">
				<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
				<div className="rankBox">
					{tab === defTabId.event ? (
						<div className="rankInBox">
							<EventTab
								t={t}
								tab={tab}
								rewardList={rewardList}
								userInfo={userInfo}
							/>
						</div>
					) : (
						<div className="rankInBox">
							{tab === defTabId.ranking ? (
								<h1 className="title">
									{t("lbl_Ranking_Top20")}
								</h1>
							) : (
								<DayDropdown
									t={t}
									onChangeDays={onChangeDays}
									beforeDays={beforeDays}
								/>
							)}
							{rankingData?.length > 0 ? (
								<div className="ranklist">
									<ul>
										<li>
											<div>{t("lbl_Ranking")}</div>
											<div>{t("lbl_Username")}</div>
											<div>{t("lbl_Points")}</div>
										</li>
										<Ranking
											rankingData={rankingData}
											t={t}
										/>
									</ul>
									<SelfRanking
										selfRankingData={selfRankingData}
										userInfo={userInfo}
										tab={tab}
									/>
								</div>
							) : (
								<div className="icon icon-nodata">
									{t("lbl_NoData")}
								</div>
							)}
							<p className="remind">
								{t(`lbl_LastUpdTime`, {
									time: showUpdateTime()
								})}
							</p>
						</div>
					)}
					<div className="rankInBox ranInBox2">
						<div className="textBox">
							<h1>{t("lbl_No1_Reward")}</h1>
							<p>IPHONE 12 PRO MAX(256GB)</p>
						</div>
						<img
							src={require("../../styles/img/ranking/iphone.png")}
							alt="iphone"
						/>
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
					<img
						src={
							idx < 3
								? require(`../../styles/img/ranking/trophy${
										idx + 1
								  }.png`)
								: require(`../../styles/img/ranking/trophy4.png`)
						}
						alt="ranking_top"
					/>
					{idx + 1}
				</div>
				<div>{item.userName}</div>
				<div className="point">{number_format(item.wTurnover)}</div>
			</li>
		);
	});

const SelfRanking = ({ selfRankingData, userInfo, tab }) =>
	selfRankingData?.custRank > 0 ? (
		<div className="myRank">
			<div>
				{tab === defTabId.ranking ? (
					<img
						src={require(`../../styles/img/ranking/trophy4.png`)}
					/>
				) : null}
				{selfRankingData.custRank > 999
					? "999+"
					: selfRankingData.custRank}
			</div>
			<div>{userInfo.userName}</div>
			<div className="point">{selfRankingData.point}</div>
		</div>
	) : null;
