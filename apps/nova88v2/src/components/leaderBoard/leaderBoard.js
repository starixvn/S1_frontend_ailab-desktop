import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import axios from "axios";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import {
	GetLeaderboardListV3,
	api_events_GetCustRankV2,
	GetLeaderboardListMonth,
	GetCustRankMonth
} from "../../service/api/events";
import LeaderBoardTab from "./leaderBoard.tabs";
import {
	defTabId,
	defDayNum,
	defRewardList,
	defEventCode,
	defRankNum,
	defGameType,
	defMonthKey
} from "./leaderBoard.def";
import { cloudImgUrl } from "../../config";
import ContentEvent from "./leaderBoard.content.event";
import Content from "./leaderBoard.content";
import { langAndCurrMapping, defCurrencyList } from "../common/common";
import { siteDefLangId } from "../../service/language";
import defaultBg from "../../styles/img/ranking_page_bg.jpg";
import sportsBg from "../../styles/img/ranking_page_bg_sports.jpg";
import casinoBg from "../../styles/img/ranking_page_bg_casino.jpg";
import slotBg from "../../styles/img/ranking_page_bg_slot.jpg";

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

	const rewardList =
		currencyId === defCurrencyList.INR
			? defRewardList({ t }).MYR
			: defRewardList({ t })[t(`Currency_${currencyId}`)];

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		showUpdateTime();
		getPeriodList();
		getRealTimePeriodId();
	}, [userInfo.userName]);

	useEffect(() => {
		if (!userInfo.isLogin) {
			setTab(defTabId.first);
		}
	}, [userInfo.isLogin]);

	const showUpdateTime = () => {
		const _time = new Date();
		const _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		const displayTime = moment(_time).format("YYYY/MM/DD hh:mm:ss");
		return displayTime;
	};

	const getPeriodList = () => {
		const dataStartDate = new Date("2021-08-01");
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
		monthDataList.sort(function (a, b) {
			return new Date(a.startDate) > new Date(b.startDate) ? 1 : -1;
		});
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
			await GetLeaderboardListV3(payload).then(res => {
				if (res.data.errorCode === 0) {
					const rankDatas = res.data.data;
					if (rankDatas?.length > 0) {
						api_events_GetCustRankV2({
							LBCategoryId: payload.lBCategoryId,
							BeforeDays: payload.BeforeDays,
							EventCode: payload.EventCode
						}).then(resRank => {
							if (resRank.data.errorCode === 0) {
								const {
									custRank,
									point,
									status
								} = resRank.data.data;
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

	const linkToTnc = async () => {
		try {
			const _URL = `${cloudImgUrl}/NovaPromotion/ranking_new_tnc/${
				userInfo.langId === "en" ? "cs_en" : userInfo.langId
			}.html`;

			await axios.get(_URL);
			window.open(_URL);
		} catch (error) {
			window.open(
				`${cloudImgUrl}/NovaPromotion/ranking_new_tnc/cs_en.html`
			);
		}
	};

	const showBackground = () => {
		let result = defaultBg;
		if (gameType === defGameType.sports) {
			result = sportsBg;
		}
		if (gameType === defGameType.casino) {
			result = casinoBg;
		}
		if (gameType === defGameType.slots) {
			result = slotBg;
		}
		return result;
	};

	return (
		<main
			className="rankingNew"
			style={{
				backgroundImage: `url(${showBackground()})`
			}}>
			<section>
				<LeaderBoardTab t={t} onChangeTab={onChangeTab} tab={tab} />
				{tab === defTabId.first ? (
					<ContentEvent
						t={t}
						tab={tab}
						rewardList={rewardList}
						linkToTnc={linkToTnc}
					/>
				) : (
					<Content
						t={t}
						showUpdateTime={showUpdateTime}
						tab={tab}
						periodId={periodId}
						rewardList={rewardList}
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
