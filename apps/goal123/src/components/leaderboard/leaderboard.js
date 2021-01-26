import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { popBoxContext, userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { defPopBoxType } from "../common/popBox";
import {
	api_events_GetLeaderboardListV2,
	api_events_GetCustRankV2
} from "../../service/api/events";
import LeaderBoardTabs from "./leaderboard.tabs";
import LeaderboardEventTab from "./leaderboard.eventTab";
import {
	current_eventCode,
	last_eventCode,
	defTabId,
	defDayNum,
	defImgRankId,
	defRewardList,
	defBackground,
	TopNum,
	defDayOptions,
	defTabList,
	defLastChampionReward
} from "./leaderboard.def";

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

	const isEventTab = tab === defTabId.event;

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	const rewardList = defRewardList[currencyName];
	const no1Reward =
		tab === defTabId.lastEvent
			? defLastChampionReward[currencyName][0].reward
			: defRewardList[currencyName][0].reward;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

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
		const displayTime = moment(_time).format("YYYY/MM/DD HH:mm:ss");
		return displayTime;
	};

	const onChangeTab = tabValue => {
		if (tabValue !== defTabId.event && !userInfo.isLogin)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		setTab(tabValue);
		if (tabValue === defTabId.ranking || tabValue === defTabId.lastEvent)
			return fetchData(defDayNum.today, tabValue);
		if (tabValue === defTabId.records)
			return fetchData(defDayNum.yesterDay, tabValue);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = async (daysValue, tabValue) => {
		if (!userInfo.isLogin) return;
		const isLastEventTab = tabValue === defTabId.lastEvent;
		const payload = {
			lBCategoryId,
			TopNum,
			BeforeDays: daysValue ?? beforeDays,
			EventCode: isLastEventTab ? last_eventCode : current_eventCode
		};

		await api_events_GetLeaderboardListV2(payload).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;
					if (rankDatas?.length > 0) {
						api_events_GetCustRankV2(payload).then(resRank => {
							if (resRank.data.errorCode === 0) {
								const { custRank, point } = resRank.data.data;

								setRankingData(() => {
									const rank =
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

	const fetchData = (_beforeDays, tabValue) => {
		setBeforeDays(_beforeDays);
		getLeaderboardData(_beforeDays, tabValue);
	};

	const title = t(defTabList.find(item => item.id === tab).displayKey);

	return (
		<main className={`leaderboard ${defBackground[tab]}`}>
			<section className="content">
				<LeaderBoardTabs t={t} onChangeTab={onChangeTab} tab={tab} />

				<div className="rightModule">
					{isEventTab ? (
						<LeaderboardEventTab
							t={t}
							tab={tab}
							rewardList={rewardList}
							userInfo={userInfo}
						/>
					) : (
						<div
							className={`rank_content ${
								tab !== defTabId.event ? "active" : ""
							}`}>
							<div className="left">
								{tab === defTabId.records ? (
									<div className="dateSelector">
										{defDayOptions.map(item => (
											<button
												key={`btn-key-${item.id}`}
												className={
													beforeDays === item.id
														? "active"
														: ""
												}
												onClick={() =>
													fetchData(item.id)
												}>
												{t(item.displayKey)}
											</button>
										))}
									</div>
								) : null}

								<img
									className="mb-2"
									alt="champion-img"
									src={require("../../styles/img/champion.png")}
								/>
								<div className="highest">
									{t("lbl_No1Award")}
									<span>{`VND ${no1Reward}`}</span>
								</div>
							</div>

							<div className="right">
								<div className="title">{title}</div>
								<div className="rankingList">
									<ul className="rankScroll">
										<li>
											<div>{t("lbl_Rank")}</div>
											<div>{t("lbl_Username")}</div>
											<div>{t("lbl_Points")}</div>
										</li>

										{rankingData?.length > 0 ? (
											rankingData?.map((item, idx) => {
												return (
													<RankItem
														key={`leaderboard_item_${item.userName}`}
														item={item}
														idx={idx}
													/>
												);
											})
										) : (
											<div className="nodata">
												{t("msg_NoData")}
											</div>
										)}
									</ul>
								</div>

								{tab === defTabId.lastEvent ? null : (
									<div className="message">
										{t(`lbl_LastUpdTime`, {
											time: showUpdateTime()
										})}
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

const RankItem = ({ item, idx }) => {
	let mineClass = "";

	if (item.rank) {
		if ((mineClass = item.rank <= TopNum && item.rank !== 0)) {
			mineClass = "mineInner";
		} else {
			mineClass = "mine";
		}
	} else {
		mineClass = "";
	}

	return (
		<li className={mineClass}>
			<div>
				<img
					alt="nbadge-img"
					src={require(`../../styles/img/${
						idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
					}.png`)}
				/>
				{item?.rank || idx + 1}
			</div>
			<div>{item.userName}</div>
			<div>{number_format(item.wTurnover)}</div>
		</li>
	);
};

RankItem.propTypes = {
	item: PropTypes.objectOf(PropTypes.any).isRequired,
	idx: PropTypes.number.isRequired
};
