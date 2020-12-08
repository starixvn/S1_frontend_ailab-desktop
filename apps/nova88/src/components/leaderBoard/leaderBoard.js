import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import championImg from "../../styles/img/champion.png";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import LeaderBoardTab from "./leaderboardTabs";
import GameTypeButtons from "./gameTypeButtons";
import DateButtons from "./dateButtons";
import { defTabId, defDayNum } from "./leaderboard.def";
import moment from "moment";

export default () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [rankingData, setRankingData] = useState(null);
	const [tab, setTab] = useState(1);
	const [categoryID, setCategoryID] = useState(defTabId.sports);
	const [beforeDays, setBeforeDays] = useState(defDayNum.yesterDay);
	const TopNum = 10;

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	useEffect(() => {
		getLeaderboardData();
		showUpdateTime();
	}, []);

	const showUpdateTime = () => {
		let currentTime = moment().format("YYYY/MM/DD hh:mm");
		let currentMin = moment().format("mm");
		let _displayMin;
		if (currentMin < 30) {
			_displayMin = "00";
		} else {
			_displayMin = "30";
		}
		let displayTime = currentTime
			.slice(0, currentTime.length - 2)
			.concat(_displayMin, ":00");
		return displayTime;
	};

	const onChangeTab = tabValue => {
		setTab(tabValue);
		if (tabValue === defTabId.sports) {
			onChangeGameType(defTabId.sports);
		} else if (tabValue === defTabId.liveCasino) {
			onChangeGameType(defTabId.liveCasino);
		} else if (tabValue === defTabId.slots) {
			onChangeGameType(defTabId.slots);
		}
	};

	const onChangeGameType = typeValue => {
		setCategoryID(typeValue);
		getLeaderboardData(typeValue, beforeDays);
	};

	const onChangeDays = daysValue => {
		setBeforeDays(daysValue);
		getLeaderboardData(categoryID, daysValue);
	};

	const getLeaderboardData = async (typeValue, daysValue) => {
		let payload = {
			lBCategoryId: typeValue ?? categoryID,
			TopNum: TopNum,
			BeforeDays: daysValue ?? beforeDays
		};

		await api_events_GetLeaderboardList(payload).then(
			res => {
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
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
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
		);
	};

	const formatTurnover = turnoverValue => {
		let newValue = turnoverValue
			.toFixed(2)
			.toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return newValue;
	};

	const rankingList = rankingData?.map((item, idx) => {
		return (
			<li key={`leaderboard_item_${item.custId}`}>
				<div>
					{idx < 3 ? (
						<img
							src={require(`../../styles/img/no${idx + 1}.png`)}
							alt="ranking_top_three"
						/>
					) : null}
					{t("lbl_NO")}
					{idx + 1}
				</div>
				<div>{item.userName}</div>
				<div>{formatTurnover(item.wTurnover)}</div>
			</li>
		);
	});

	return (
		<>
			<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
			<div className="champion">
				<div className="highest">
					<div className="rankTag">
						{tab === defTabId.event || tab === defTabId.records ? (
							<>
								<div>{t("lbl_Game_type")}</div>
								<GameTypeButtons
									t={t}
									onChangeGameType={onChangeGameType}
									categoryID={categoryID}
									tab={tab}
								/>
							</>
						) : null}
						<div>{t("lbl_Date")}</div>
						<DateButtons
							t={t}
							onChangeDays={onChangeDays}
							beforeDays={beforeDays}
							tab={tab}
						/>
					</div>
					<img src={championImg} alt="champion" />
					<div className="mwt_border">
						<span className="arrow_t_int"></span>
						<span className="arrow_t_out"></span>
						{/* <div>HIGHEST WINNING RECORD</div> */}
						{/* <div>(Last 7 Days) ******kboy</div> */}
						<div className="txt-orange">MYR 10,000,000.00</div>
					</div>
				</div>
				<div className="rankModule">
					<div className="rankList">
						<ul>
							<li>
								<div>{t("lbl_Ranking")}</div>
								<div>{t("lbl_Username")}</div>
								<div>{t("lbl_Points")}</div>
							</li>
							{rankingList}
						</ul>
					</div>
					<div className="lastUpdate">
						{t("lbl_Last_update_on")} {showUpdateTime()} (
						{t("lbl_Update_every_30_minutes")})
					</div>
				</div>
			</div>
		</>
	);
};
