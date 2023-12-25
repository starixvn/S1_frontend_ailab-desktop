import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { navigate } from "gatsby";
import { useGetLeaderboardSettingQuery } from "@ailab-desktop/service";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import {
	api_events_GetLeaderboardList,
	api_events_GetCustRank,
	GetLeaderboardListMonth,
	GetCustRankMonth
} from "../../service/api/events";
import LeaderBoardTab from "./leaderBoard.tabs";
import {
	defTabId,
	defDayNum,
	defEventCode,
	defRankNum,
	defGameType,
	defMonthKey,
	getLeaderBoardSupportCurrencyId
} from "./leaderBoard.def";
import config, { bannerImgUrl } from "../../config";
import ContentEvent from "./leaderBoard.content.event";
import Content from "./leaderBoard.content";
import {
	langAndCurrMapping,
	getCombineLeaderBoardLangId
} from "../common/common";
import { siteDefLangId } from "../../service/language";

const CanSeeLeaderBoard = ({ currencyId }) => {
	const supportCurrencyList = getLeaderBoardSupportCurrencyId();

	return supportCurrencyList.includes(currencyId);
};

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);
	const [rankingData, setRankingData] = useState([]);
	const [tab, setTab] = useState(defTabId.first);
	const [periodId, setPeriodId] = useState(null);
	const [beforeDays, setBeforeDays] = useState(defDayNum.today);
	const [gameType, setGameType] = useState(defGameType.all);

	const rankTopNum =
		tab === defTabId.fourth ? defRankNum.monthly : defRankNum.current;
	const _langMappingCurr = userInfo.langId ?? siteDefLangId;
	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: langAndCurrMapping[_langMappingCurr];

	const _canSeeLeaderBoard = CanSeeLeaderBoard({ currencyId });

	const { data: { data: leaderboardEventData } = {} } =
		useGetLeaderboardSettingQuery({
			siteId: config.siteId,
			currencyId: userInfo.currencyId
		});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (_canSeeLeaderBoard) {
			showUpdateTime();
			getPeriodList();
			getRealTimePeriodId();
		}
	}, [userInfo.userName, _canSeeLeaderBoard]);

	useEffect(() => {
		if (!userInfo.isLogin && _canSeeLeaderBoard) {
			setTab(defTabId.first);
		}
	}, [userInfo.isLogin, _canSeeLeaderBoard]);

	const showUpdateTime = () => {
		const now = moment();
		const startOfHour = moment().startOf("hour");

		let _displaytime = startOfHour;
		if (now.subtract(30, "minute") > startOfHour) {
			_displaytime = startOfHour.add(30, "minute");
		}

		return moment(_displaytime).format("YYYY/MM/DD HH:mm:ss");
	};

	const getPeriodList = () => {
		// * 月排名暫時顯示四月到當前月份，等ＰＭ通知再修正回起始月份 "2023-01-01"
		const dataStartDate = new Date("2023-04-01");

		const currentDate = new Date();
		const betweenMonthNum =
			(currentDate.getFullYear() - dataStartDate.getFullYear()) * 12 +
			(currentDate.getMonth() - dataStartDate.getMonth());
		const allMonths = Array.from(Array(12), (_, i) => i + 1);
		const monthDataList = [];
		for (let i = -1; i < betweenMonthNum; i++) {
			const pass = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth() - i - 1,
				1
			);
			const month = allMonths[pass.getMonth()];
			const monthString = month < 10 ? `0${month}` : month;
			const year = pass.getFullYear();
			monthDataList.push({
				displayKey: `${defMonthKey[month]}`,
				year: `${year}`,
				startDate: `${year}-${monthString}-01`,
				endDate: `${year}-${monthString}-${new Date(
					year,
					month + 1,
					0
				).getDate()}`
			});
		}
		monthDataList.sort((a, b) =>
			new Date(a.startDate) > new Date(b.startDate) ? 1 : -1
		);
		const resultList = [];
		monthDataList.forEach((item, idx) => {
			resultList.push({ id: idx + 1, ...item });
		});
		return resultList;
	};

	const periodList = getPeriodList();

	const getRealTimePeriodId = () => {
		const Today = new Date();
		let result;
		periodList.forEach(pd => {
			if (
				Today > new Date(pd.startDate) &&
				Today < new Date(pd.endDate)
			) {
				result = pd.id;
			}
		});
		return result;
	};

	const onChangeTab = _tabId => {
		const _gameType =
			_tabId === defTabId.third ? defGameType.sports : defGameType.all;
		if (_tabId !== defTabId.first && !userInfo.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		} else if (_tabId === defTabId.fourth) {
			setTab(_tabId);
			setGameType(_gameType);
			getPeriodList();
			const hasSettledPeriodId =
				getRealTimePeriodId() - 1 < 1 ? 1 : getRealTimePeriodId() - 1;
			setPeriodId(hasSettledPeriodId);
			if (periodList.length > 0) {
				getMonthlyData(
					periodList.filter(_pd => _pd.id === hasSettledPeriodId)[0]
				);
			} else {
				setRankingData([]);
			}
		} else {
			setTab(_tabId);
			setGameType(_gameType);
			setBeforeDays(defDayNum.today);
			getLeaderboardData(defDayNum.today, _gameType, _tabId);
		}
	};

	const onChangeDays = _days => {
		setBeforeDays(_days);
		getLeaderboardData(_days, gameType, tab);
	};

	const onChangeGameType = _type => {
		setGameType(_type);
		getLeaderboardData(beforeDays, _type, tab);
	};

	const getLeaderboardData = (_days, _gameType, _tabId) => {
		if (!userInfo.isLogin) return;
		if (!_tabId || _tabId === defTabId.first) return;

		const payload = {
			lBCategoryId: _gameType ?? gameType,
			TopNum: defRankNum.current,
			BeforeDays: _days ?? beforeDays,
			EventCode: defEventCode.current
		};

		const GetRankDatas = async () => {
			await api_events_GetLeaderboardList(payload).then(res => {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;
					if (rankDatas?.length > 0) {
						api_events_GetCustRank({
							LBCategoryId: payload.lBCategoryId,
							BeforeDays: payload.BeforeDays,
							EventCode: payload.EventCode
						}).then(resRank => {
							if (resRank.data.errorCode === 0) {
								const { custRank, point, status } =
									resRank.data.data;
								setRankingData(() => {
									const rank =
										custRank > 999 || custRank === 0
											? "999+"
											: custRank;

									let result = [];
									if (
										custRank <= rankTopNum &&
										custRank !== 0
									) {
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
												status,
												rank
											}
										];
									}
									return result;
								});
							} else {
								openErrorMessagePopBox(
									resRank.data.message,
									resRank.data.errorCode
								);
							}
						});
					} else {
						setRankingData([]);
					}
				} else {
					openErrorMessagePopBox(
						res.data.message,
						res.data.errorCode
					);
				}
			});
		};
		GetRankDatas();
	};

	const onChangePeriod = _periodData => {
		setPeriodId(_periodData.id);
		getMonthlyData(_periodData);
	};

	const getMonthlyData = _periodData => {
		if (!userInfo.isLogin) return;
		setRankingData([]);

		const payload = {
			lBCategoryId: defGameType.all,
			TopNum: defRankNum.monthly,
			SelectDays: _periodData.startDate,
			EventCode: defEventCode.monthly
		};

		const GetMonthlyRankDatas = async () => {
			await GetLeaderboardListMonth(payload).then(res => {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;
					if (rankDatas?.length > 0) {
						GetCustRankMonth({
							LBCategoryId: payload.lBCategoryId,
							SelectDays: payload.SelectDays,
							EventCode: payload.EventCode
						}).then(resRank => {
							if (resRank.data.errorCode === 0) {
								const { custRank, point } = resRank.data.data;
								setRankingData(() => {
									const rank =
										custRank > 999 || custRank === 0
											? "999+"
											: custRank;

									let result = [];
									if (
										custRank <= rankTopNum &&
										custRank !== 0
									) {
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
							} else {
								openErrorMessagePopBox(
									resRank.data.message,
									resRank.data.errorCode
								);
							}
						});
					} else {
						setRankingData([]);
					}
				} else {
					openErrorMessagePopBox(
						res.data.message,
						res.data.errorCode
					);
				}
			});
		};
		GetMonthlyRankDatas();
	};

	const openErrorMessagePopBox = (message, errorCode) => {
		setPopBox({
			message: message ?? t("msg_ApiServerError"),
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-check" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const linkToTnc = () => {
		window.open(
			`${bannerImgUrl}/NovaPromotion/ranking_new_tnc/${getCombineLeaderBoardLangId(
				userInfo.langId,
				userInfo.currencyId
			)}.html`
		);
	};

	const showBackground = () => {
		let result = `${bannerImgUrl}/desktop/img/ranking_new_sportsbg.jpg`;

		if (gameType === defGameType.casino) {
			result = `${bannerImgUrl}/desktop/img/ranking_page_bg_casino.jpg`;
		}
		if (gameType === defGameType.slots) {
			result = `${bannerImgUrl}/desktop/img/ranking_page_bg_slot.jpg`;
		}
		return result;
	};

	if (!_canSeeLeaderBoard) {
		navigate(`/${userInfo.langId}`);
		return null;
	}

	return (
		<main
			className="rankingNew"
			style={{
				backgroundImage: `url(${showBackground()})`
			}}
		>
			<section>
				<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
				{tab === defTabId.first ? (
					<ContentEvent
						t={t}
						tab={tab}
						leaderBoardEventData={leaderboardEventData}
						linkToTnc={linkToTnc}
					/>
				) : (
					<Content
						t={t}
						showUpdateTime={showUpdateTime}
						tab={tab}
						periodId={periodId}
						periodList={periodList}
						rankingData={rankingData}
						onChangePeriod={onChangePeriod}
						onChangeDays={onChangeDays}
						beforeDays={beforeDays}
						onChangeGameType={onChangeGameType}
						gameType={gameType}
					/>
				)}
			</section>
		</main>
	);
};
