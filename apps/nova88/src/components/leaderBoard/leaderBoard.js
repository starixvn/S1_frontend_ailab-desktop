import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import championImg from "../../styles/img/champion.png";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import LeaderBoardTab from "./leaderboard.tabs";
import ButtonGroups from "./leaderboard.btnGroups";
import { defTabId, defDayNum } from "./leaderboard.def";
import moment from "moment";
import { number_format } from "../common/common";

export default () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [rankingData, setRankingData] = useState(null);
	const [tab, setTab] = useState(defTabId.event);
	const [categoryID, setCategoryID] = useState(defTabId.sports);
	const [beforeDays, setBeforeDays] = useState(defDayNum.yesterDay);
	const TopNum = 10;
	const isGameTypeTab =
		tab === defTabId.sports ||
		tab === defTabId.liveCasino ||
		tab === defTabId.slots;
	const winnerBonus = t("Currency_2") + number_format(10000000);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getLeaderboardData();
		showUpdateTime();
	}, []);

	const showUpdateTime = () => {
		let _time = new Date();
		let _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		let displayTime = moment(_time).format("YYYY/MM/DD hh:mm:ss");
		return displayTime;
	};

	const onChangeTab = tabValue => {
		setTab(tabValue);
		setBeforeDays(defDayNum.yesterDay);
		if (tabValue === defTabId.event || tabValue === defTabId.records) {
			onChangeGameType(defTabId.sports);
		} else {
			onChangeGameType(tabValue);
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

		const ClickClose = () => {
			setPopBox({ isOpen: false });
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
					{t("lbl_Top")}
					{idx + 1}
				</div>
				<div>{item.userName}</div>
				<div>{number_format(item.wTurnover)}</div>
			</li>
		);
	});

	return (
		<>
			<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
			<div className="champion">
				<div className="highest">
					{tab === defTabId.event || tab === defTabId.records ? (
						<ButtonGroups
							t={t}
							onChangeGameType={onChangeGameType}
							categoryID={categoryID}
							onChangeDays={onChangeDays}
							beforeDays={beforeDays}
						/>
					) : null}
					<img src={championImg} alt="champion" />
					{isGameTypeTab ? null : (
						<div className="mwt_border">
							<span className="arrow_t_int"></span>
							<span className="arrow_t_out"></span>
							<div className="txt-orange">{winnerBonus}</div>
						</div>
					)}
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
						{t(`lbl_LastUpdTime`, { time: showUpdateTime() })}
					</div>
				</div>
			</div>
		</>
	);
};
