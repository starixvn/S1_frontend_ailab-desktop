import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import moment from "moment";
import { useTranslation } from "react-i18next";
import paths from "../../router";
import {
	api_cupEvent_GetCupEventPredictionSetting,
	api_cupEvent_GetCupEventTicket,
	api_cupEvent_GetCupEventTicketSummary,
	api_cupEvent_GetMemberDeposit,
	api_cupEvent_MultiUserPollTickets
} from "../../service/api/euroCup";
import { popBoxContext, userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import PredictList from "./predict/predictLIst";
import TicketOverview from "./ticketOverview";
import TeamSelector from "./predict/teamSelector";
import PredictionRecord from "./predict/predictionRecord";
import { DIRECTIONS_TYPE } from "./def";
import Directions from "./directions";
import RewardItem from "./reward/RewardItem";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import defPopBoxType from "../common/defPopBoxType";
import { numFormatToDigits } from "../common/common";
import RewardItemWinner from "./reward/RewardItemWinner";

const EuroCup = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [predictionSetting, setPredictionSetting] = useState(null);
	const [tickets, setTickets] = useState({});
	const [memberDepositList, setMemberDepositList] = useState([]);
	const [ticketSummary, setTicketSummary] = useState([]);
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [isShowMore, setIsShowMore] = useState(false);
	const [directionsType, setDirectionsType] = useState(
		DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
	);

	const getCupEventPredictionSetting = async ({ langId }) => {
		try {
			const res = await api_cupEvent_GetCupEventPredictionSetting({
				langId
			});
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setPredictionSetting(data);
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const getCupEventTicket = async () => {
		try {
			const res = await api_cupEvent_GetCupEventTicket();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setTickets(data);
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const getMemberDeposit = async () => {
		try {
			const res = await api_cupEvent_GetMemberDeposit();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				setMemberDepositList(data);
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const getTicketsSummary = async () => {
		try {
			const res = await api_cupEvent_GetCupEventTicketSummary();
			const { errorCode, message, data } = res.data;
			if (errorCode === 0) {
				const sortedData = data.sort(
					(a, b) => b.percentage - a.percentage
				);
				setTicketSummary(sortedData);
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(predictionSetting?.selectOptions);

	const usedTickets = tickets.userTicketResult?.groupCountryTicket
		.filter(({ countryId }) => countryId !== null)
		.map(ticketObj => {
			const matchOption = options.find(
				option => option.countryId === ticketObj.countryId
			);
			return {
				...ticketObj,
				...matchOption
			};
		});

	const onShowMoreToggle = () => {
		setIsShowMore(prev => !prev);
	};

	const handleSubmitConfirmModalOpen = async ({ userPollTicket, count }) => {
		if (!selectedTeamId || !ticketsNumber) return;
		const selectedTeam = options.find(
			({ countryId }) => countryId === selectedTeamId
		);
		const onSubmit = async () => {
			try {
				const res = await api_cupEvent_MultiUserPollTickets({
					userPollTicket,
					count
				});
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					setTicketsNumber("");
					await getCupEventTicket();
					await getTicketsSummary();
					setPopBox({ isOpen: false });
				} else {
					errorPopBox(message || "error", errorCode);
				}
			} catch (error) {
				errorPopBox(error);
			}
		};
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Modal,
			className: `pop submitpop`,
			content: (
				<div className="submitpop-wrapper active">
					<div>
						<div className="record-item">
							<div className="record-item-box">
								<img
									className="euro-logo"
									src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo.png`}
									alt=""
								/>
								<div>
									<div className="record-item-team">
										<span className="team-title">
											{t("lbl_CupEvent_PredictionTeam")}
										</span>
										<div>
											<img
												src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
												alt=""
											/>
											<span>
												{selectedTeam.countryName}
											</span>
										</div>
									</div>
									<div className="record-item-number">
										<span>
											{t("lbl_CupEvent_NumberOfTickets")}
										</span>
										<span>
											{count} {t("lbl_CupEvent_Tickets")}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="submitpop-tip">
						{t("lbl_CupEvent_ConfirmMsg")}
					</div>
					<div className="submitpop-btn">
						<button onClick={onSubmit}>{t("lbl_OK")}</button>
						<button onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Cancel")}
						</button>
					</div>
				</div>
			)
		});
	};

	const handleDepositListModalOpen = () => {
		if (memberDepositList.length === 0) return;
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Modal,
			content: (
				<div className="pop depositlist">
					<div className="depositlist-wrapper active">
						<div className="depositlist-title">
							{t("lbl_CupEvent_DepositList")}
						</div>
						<div className="depositlist-item">
							<div>
								<div>
									<div className="first-text">
										{t("lbl_Date")} (
										{memberDepositList[0].statementTime.slice(
											-6
										)}
										)
									</div>
								</div>
								{memberDepositList.map(({ statementTime }) => (
									<div>
										{moment(statementTime).format(
											"YYYY/MM/DD HH:mm:ss"
										)}
									</div>
								))}
							</div>
							<div>
								<div>
									<div className="first-text">Deposit ID</div>
								</div>
								{memberDepositList.map(({ transId }) => (
									<div>{transId}</div>
								))}
							</div>
							<div>
								<div>
									<div className="first-text">
										{t("lbl_DepositAmount")}
									</div>
								</div>
								{memberDepositList.map(({ depositAmount }) => (
									<div>
										{numFormatToDigits(depositAmount, 0)}
										<div>VND</div>
									</div>
								))}
							</div>
						</div>

						<div
							className="close-btn"
							onClick={() => setPopBox({ isOpen: false })}>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/close-circle.png`}
								alt=""
							/>
						</div>
					</div>
				</div>
			)
		});
	};

	const handlePredictionExpire = () => {
		// 目標時間為6月14日的23點59分59秒（GMT+8）,故utc時間減8小時做判斷
		const targetTimeUtc = moment.utc("2024-06-14 15:59:59");
		const nowUtc = moment.utc();
		return nowUtc.isAfter(targetTimeUtc);
	};

	const isPredictionExpire = handlePredictionExpire();

	useEffect(() => {
		if (userInfo.isLogin) {
			getCupEventTicket();
			getMemberDeposit();
		}
		getCupEventPredictionSetting({ langId: userInfo.langId });
		getTicketsSummary();
	}, [userInfo.isLogin]);

	return (
		<>
			<img
				className="top-bn"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/top-bn-${userInfo.langId}.jpg`}
				alt=""
			/>
			<div className="prediction-wrapper">
				<div className="prediction-left">
					<div>{t("lbl_CupEvent_PredictionOfParticipant")}</div>
					<div>{t("lbl_CupEvent_PredictionOfParticipant_desc")}</div>
					<a
						className="deposit-btn-a"
						onClick={() => {
							userInfo.isLogin
								? navigate(
										`/${userInfo.langId}/${paths.deposit.root}`
								  )
								: setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.Login
								  });
						}}>
						<span>{t("lbl_DepositNow")}</span>
						<img
							src={`${bannerImgUrl}/desktop/img/event/eurocup/arrow-right.png`}
							alt=""
						/>
					</a>
				</div>
				<PredictList ticketSummary={ticketSummary} />
			</div>
			<div className="ticket-wrapper">
				<TicketOverview
					tickets={tickets}
					onOpen={handleDepositListModalOpen}
				/>
				<TeamSelector
					options={options}
					selectedTeamId={selectedTeamId}
					ticketsNumber={ticketsNumber}
					isPredictionExpire={isPredictionExpire}
					setTicketsNumber={setTicketsNumber}
					onChange={setSelectedTeamId}
					onSubmit={handleSubmitConfirmModalOpen}
				/>
				{usedTickets?.length > 0 && (
					<PredictionRecord
						usedTickets={usedTickets}
						isShowMore={isShowMore}
						onShowMoreToggle={onShowMoreToggle}
					/>
				)}
			</div>
			<div className="bottom-wrapper">
				<RewardItem />
				{/* 開獎後將RewardItem切換RewardItemWinner */}
				{/* <RewardItemWinner /> */}
				<Directions
					directionsType={directionsType}
					setDirectionsType={setDirectionsType}
				/>
			</div>
			<div className="footer-bg">
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/footer-bg.png`}
					alt=""
				/>
			</div>
		</>
	);
};

export default EuroCup;
