import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank
} from "../../service/api/events";
import LeaderBoardTab from "./leaderboard.tabs";

import {
	defTabId,
	defBackground,
	defDayNum,
	defRewardList,
	defTopWinnerNum
} from "./leaderboard.def";
import EventTab from "./leaderboard.eventTab";
import RankingTab from "./leaderboard.rankingTab";

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

	const currencyName = userInfo.currencyId
		? currMapping[userInfo.currencyId] ??
		  t(`Currency_${userInfo.currencyId}`)
		: langMapping[userInfo.langId];

	const rewardList = defRewardList[currencyName];
	const no1Reward = rewardList[0].reward;

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

	const getLeaderboardData = async daysValue => {
		if (!userInfo.isLogin) return;
		const payload_topWinner = {
			lBCategoryId,
			TopNum: defTopWinnerNum,
			BeforeDays: daysValue
		};
		const payload_self = {
			LBCategoryId: lBCategoryId,
			BeforeDays: daysValue
		};
		await api_events_GetLeaderboardList(payload_topWinner).then(
			async res => {
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
							const selfItem = await api_events_GetCustRank(
								payload_self
							).then(resRank => {
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
								showErrorPopBox(resRank.data.message);
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
			}
		);
	};

	return (
		<section className={`rankingPage ${defBackground[tab]}`}>
			<img
				className="bottomImg"
				src={require("../../styles/img/ranking/bottomImg.png")}
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
							<RankingTab
								t={t}
								tab={tab}
								rewardList={rewardList}
								userInfo={userInfo}
								rankingData={rankingData}
								onChangeDays={onChangeDays}
								beforeDays={beforeDays}
							/>
						</div>
					)}
					<div className="rankInBox rankInBox2">
						<div className="textBox">
							<h1>{t("lbl_No1_Reward")}</h1>
							<p>{no1Reward}</p>
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
