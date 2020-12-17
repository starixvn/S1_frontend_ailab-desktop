import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
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
	defRewardList
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
			if (tabValue === defTabId.records) {
				getLeaderboardData(1);
			} else {
				getLeaderboardData(0);
			}
		}
	};

	const onChangeDays = daysValue => {
		setBeforeDays(daysValue + 1);
		getLeaderboardData(daysValue + 1);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getLeaderboardData = async daysValue => {
		if (!userInfo.isLogin) return;
		const payload_top20 = {
			lBCategoryId: lBCategoryId,
			TopNum: TopNum,
			BeforeDays: daysValue
		};
		const payload_self = {
			lBCategoryId: lBCategoryId,
			BeforeDays: daysValue
		};
		await api_events_GetLeaderboardList(payload_top20).then(async res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					let top20Arr = res.data.data;

					let userInTop20 =
						top20Arr.findIndex(
							r => r.username === userInfo.userName
						) !== -1;

					if (userInTop20) {
						setRankingData(top20Arr);
					} else {
						let selfItem = await api_events_GetCustRank(
							payload_self
						).then(res => {
							if (res.data.errorCode === 0) {
								let resData = res.data.data;
								let selfObj = {
									userName: userInfo.userName,
									wTurnover: resData.point,
									custRank:
										resData.custRank === 0 ||
										resData.custRank > 999
											? "999+"
											: resData.custRank
								};
								return selfObj;
							}
						});
						let filterRepeatArr = top20Arr.filter(
							r => r.username !== userInfo.userName
						);
						let concatArr = [...filterRepeatArr, selfItem];
						setRankingData(concatArr);
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

	return (
		<section className={`rankingPage ${defBackground[tab]}`}>
			<img
				src={require("../../styles/img/ranking/bottomImg.png")}
				className="bottomImg"
			/>
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
											userInfo={userInfo}
											t={t}
										/>
									</ul>
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
					<div className="rankInBox rankInBox2">
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

const Ranking = ({ rankingData, t, userInfo }) =>
	rankingData?.map((item, idx) => {
		let liStyle = () => {
			let top3Class = "";
			let myClass = "";
			if (idx < 3) {
				top3Class = "no" + (idx + 1);
			}
			if (item.userName === userInfo.userName) {
				myClass = " myRank";
			} else if (item.userName === userInfo.userName && idx < 20) {
				myClass = " myInRank";
			}
			return top3Class + myClass;
		};

		return (
			<li key={`leaderboard_item_${item.custId}`} className={liStyle()}>
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
					{item.userName === userInfo.userName
						? item.custRank
						: idx + 1}
				</div>
				<div>{item.userName}</div>
				<div className="point">{number_format(item.wTurnover)}</div>
			</li>
		);
	});
