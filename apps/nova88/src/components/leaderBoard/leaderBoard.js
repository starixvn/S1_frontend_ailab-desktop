import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import championImg from "../../styles/img/champion.png";
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
import EventTab from "./LeaderBoard.eventTab";

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
	const [categoryID, setCategoryID] = useState(defTabId.sports);
	const [beforeDays, setBeforeDays] = useState(defDayNum.yesterDay);
	const TopNum = 10;
	const isGameTypeTab =
		tab === defTabId.sports ||
		tab === defTabId.liveCasino ||
		tab === defTabId.slots;
	const isEventTab = tab === defTabId.event;

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	const rewardList = defRewardList({ t })[currencyName][categoryID];

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
			setBeforeDays(defDayNum.yesterDay);
			onChangeGameType(
				tabValue === defTabId.records || tabValue === defTabId.event
					? defTabId.sports
					: tabValue
			);
		}
	};

	const onChangeGameType = (typeValue, updateStateOnly) => {
		setCategoryID(typeValue);
		if (!updateStateOnly) {
			getLeaderboardData(typeValue, beforeDays);
			getSelfLeaderboardData(typeValue, beforeDays);
		}
	};

	const onChangeDays = daysValue => {
		setBeforeDays(daysValue);
		getLeaderboardData(categoryID, daysValue);
		getSelfLeaderboardData(categoryID, daysValue);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = async (typeValue, daysValue) => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: typeValue ?? categoryID,
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

	const getSelfLeaderboardData = async (typeValue, daysValue) => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: typeValue ?? categoryID,
			BeforeDays: daysValue ?? beforeDays
		};

		await api_events_GetCustRank(payload).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0||res.data.errorCode === 99) {
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
		<section className={`ranking ${defBackground[tab]}`}>
			<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
			{isEventTab ? (
				<EventTab
					t={t}
					onChangeGameType={onChangeGameType}
					categoryID={categoryID}
					tab={tab}
					rewardList={rewardList}
					userInfo={userInfo}
					currencyName={currencyName}
				/>
			) : (
				<div className="champion">
					<div className="highest">
						{isGameTypeTab ? (
							<div className="title">
								<div>{t(defLeaderBoardTitle[tab])}</div>
								<div className="txt-orange">
									{t("lbl_Ranking_Top10")}
								</div>
							</div>
						) : (
							<ButtonGroups
								t={t}
								onChangeGameType={onChangeGameType}
								categoryID={categoryID}
								onChangeDays={onChangeDays}
								beforeDays={beforeDays}
							/>
						)}
						<img src={championImg} alt="champion" />
						<div className="mwt_border">
							<span className="arrow_t_int"></span>
							<span className="arrow_t_out"></span>
							<div className="txt-orange">
								{rewardList[0].reward}
							</div>
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
							{t(`lbl_LastUpdTime`, { time: showUpdateTime() })}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

const Ranking = ({ rankingData, t }) =>
	rankingData?.map((item, idx) => {
		return (
			<li key={`leaderboard_item_${item.custId}`}>
				<div>
					{idx < 3 ? (
						<img
							src={require(`../../styles/img/no${idx + 1}.png`)}
							alt="ranking_top_three"
						/>
					) : null}
					{t("lbl_Top")}
					{idx + 1}
				</div>
				<div>{item.userName}</div>
				<div>{number_format(item.wTurnover)}</div>
			</li>
		);
	});


const SelfRanking = ({ selfRankingData, userInfo }) =>
	selfRankingData?.custRank > 0 ? (
		<li className="userRank">
			<div>
				{selfRankingData.custRank > 999
					? "999+"
					: selfRankingData.custRank}
			</div>
			<div>{userInfo.userName}</div>
			<div>{selfRankingData.point}</div>
		</li>
	) : null;
