import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank
} from "../../service/api/events";
import LeaderBoardTabNav from "./leaderBoard.tabNav";
import {
	defTabId,
	defDayNum,
	defRewardList,
	defBackground
} from "./leaderboard.def";
import moment from "moment";
import EventTab from "./leaderboard.eventTab";
import RankingTab from "./leaderboard.rankingTab";
import RecordTab from "./leaderboard.recordTab";

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
	const [updatedTime, setUpdatedTime] = useState("");
	const lBCategoryId = 1;
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
		if (tabValue !== defTabId.event && !userInfo.isLogin)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});

		setTab(tabValue);
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
					setUpdatedTime(showUpdateTime());
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

	return (
		<main className={`leaderboard ${defBackground[tab]}`}>
			<section className="content">
				<LeaderBoardTabNav t={t} onChangeTab={onChangeTab} tab={tab} />

				<div className="rightModule">
					<EventTab
						t={t}
						tab={tab}
						rewardList={rewardList}
						userInfo={userInfo}
					/>
					<RankingTab
						t={t}
						tab={tab}
						rankingData={rankingData}
						updatedTime={updatedTime}
						getLeaderboardData={getLeaderboardData}
					/>
					<RecordTab
						t={t}
						tab={tab}
						userInfo={userInfo}
						beforeDays={beforeDays}
						rankingData={rankingData}
						selfRankingData={selfRankingData}
						updatedTime={updatedTime}
						setBeforeDays={setBeforeDays}
						getLeaderboardData={getLeaderboardData}
						getSelfLeaderboardData={getSelfLeaderboardData}
					/>
				</div>
			</section>
		</main>
	);
};
