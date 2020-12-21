import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { popBoxContext, userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { defPopBoxType } from "../common/popBox";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank
} from "../../service/api/events";
import LeaderBoardTabs from "./leaderboard.tabs";
import LeaderboardEventTab from "./leaderboard.eventTab";
import {
	defTabId,
	defDayNum,
	defImgRankId,
	defRewardList,
	defBackground,
	TopNum,
	defDayOptions,
	defTabList
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

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

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
		let displayTime = moment(_time).format("YYYY/MM/DD HH:mm:ss");
		return displayTime;
	};

	const onChangeTab = tabValue => {
		if (tabValue !== defTabId.event && !userInfo.isLogin)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});

		setTab(tabValue);

		if (tabValue === defTabId.ranking) return fetchData(defDayNum.today);
		if (tabValue === defTabId.records)
			return fetchData(defDayNum.yesterDay);
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
					if (res.data.data.length !== 0) {
						getSelfLeaderboardData(daysValue);
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

	const getSelfLeaderboardData = async (daysValue = beforeDays) => {
		if (!userInfo.isLogin) return;
		let payload = {
			lBCategoryId: lBCategoryId,
			BeforeDays: daysValue
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

	const fetchData = beforeDays => {
		setBeforeDays(beforeDays);
		getLeaderboardData(beforeDays);
	};

	const title = t(defTabList.find(item => item.id === tab).displayKey);
	const { custRank, point } = selfRankingData;
	let rank = custRank > 999 || custRank === 0 ? "999+" : custRank;
	let rankResult = [];
	if (custRank <= TopNum && custRank !== 0) {
		rankingData[custRank - 1] = {
			...rankingData[custRank - 1],
			userName: userInfo.userName,
			custRank: rank
		};

		rankResult = rankingData;
	} else {
		rankResult = [
			...rankingData,
			{
				userName: userInfo.userName,
				wTurnover: point,
				custRank: rank
			}
		];
	}

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
									src={require("../../styles/img/champion.png")}
								/>
								<div className="highest">
									{t("lbl_No1Award")}
									<span>
										VND {defRewardList["VND"][0].reward}
									</span>
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
										{rankingData.length !== 0 ? (
											rankResult?.map((item, idx) => {
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
								<div className="message">
									{t(`lbl_LastUpdTime`, {
										time: showUpdateTime()
									})}
								</div>
							</div>
						</div>
					)}
				</div>
			</section>
		</main>
	);
};

const RankItem = ({ item, idx }) => {
	const mineClass = item.custRank
		? item.custRank <= TopNum && item.custRank !== 0
			? "mineInner"
			: "mine"
		: "";

	return (
		<li className={mineClass}>
			<div>
				<img
					src={require(`../../styles/img/${
						idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
					}.png`)}
				/>
				{item?.custRank || idx + 1}
			</div>
			<div>{item.userName}</div>
			<div>{number_format(item.wTurnover)}</div>
		</li>
	);
};
