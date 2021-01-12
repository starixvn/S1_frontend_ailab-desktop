import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import championImg from "../../styles/img/champion.png";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank,
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";
import LeaderBoardTab from "./leaderBoard.tabs";
import ButtonGroups from "./leaderBoard.btnGroups";
import {
	defTabId,
	defBackground,
	defDayNum,
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
	const [tab, setTab] = useState(defTabId.event);
	const [categoryID, setCategoryID] = useState(defTabId.sports);
	const [beforeDays, setBeforeDays] = useState(defDayNum.today);
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
		showUpdateTime();
	}, [userInfo.userName]);

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
			if (tabValue === defTabId.event) {
				setCategoryID(1);
			} else if (
				tabValue === defTabId.records ||
				tabValue === defTabId.lastEvent
			) {
				const days =
					tabValue === defTabId.records
						? defDayNum.yesterDay
						: defDayNum.today;
				setBeforeDays(days);
				getLeaderboardData(defTabId.sports, days, tabValue);
				setCategoryID(1);
			} else {
				onChangeGameType(tabValue, false, tabValue);
			}
		}
	};

	const onChangeGameType = (typeValue, updateStateOnly, tabValue) => {
		setCategoryID(typeValue);
		if (!updateStateOnly) {
			getLeaderboardData(
				typeValue,
				tabValue !== defTabId.records ? 0 : beforeDays,
				tabValue
			);
		}
	};

	const onChangeDays = daysValue => {
		setBeforeDays(daysValue);
		getLeaderboardData(categoryID, daysValue);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = (typeValue, daysValue, tabValue) => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: typeValue ?? categoryID,
			TopNum: TopNum,
			BeforeDays: daysValue ?? beforeDays
		};

		let payloadV2 = {
			lBCategoryId: typeValue ?? categoryID,
			TopNum: TopNum,
			BeforeDays: 0,
			EventCode: "xmas2020"
		};

		const GetRankDatas = async () => {
			try {
				let isLastEvent = tabValue === defTabId.lastEvent;
				const res = isLastEvent
					? await api_events_GetLeaderboardListV2(payloadV2)
					: await api_events_GetLeaderboardList(payload);
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;

					if (rankDatas?.length > 0) {
						const custRankRes = isLastEvent
							? await api_events_GetCustRankV2({
									LBCategoryId: payloadV2.lBCategoryId,
									BeforeDays: payloadV2.BeforeDays,
									EventCode: payloadV2.EventCode
							  })
							: await api_events_GetCustRank({
									LBCategoryId: payload.lBCategoryId,
									BeforeDays: payload.BeforeDays
							  });

						if (custRankRes.data.errorCode === 0) {
							const { custRank, point } = custRankRes.data.data;
							setRankingData(() => {
								let rank =
									custRank > 999 || custRank === 0
										? "999+"
										: custRank;

								let result = [];
								if (custRank <= TopNum && custRank !== 0) {
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
			} catch (error) {}
		};

		GetRankDatas();
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
				<div
					className={
						tab === defTabId.lastEvent ? "lastevent" : "champion"
					}>
					<div className="highest">
						{isGameTypeTab ? (
							<div className="title">
								<div>{t(defLeaderBoardTitle[tab])}</div>
							</div>
						) : (
							<ButtonGroups
								t={t}
								onChangeGameType={onChangeGameType}
								categoryID={categoryID}
								onChangeDays={onChangeDays}
								beforeDays={beforeDays}
								tab={tab}
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
									<Ranking RankingDatas={rankingData} />
								</ul>
							</div>
						) : (
							<div className="icon icon-nodata">
								{t("lbl_NoData")}
							</div>
						)}
						{tab === defTabId.lastEvent ? null : (
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
					{rank ? rank : idx + 1}
				</div>
				<div>{item.userName}</div>
				<div>{number_format(item.wTurnover)}</div>
			</li>
		);
	});
