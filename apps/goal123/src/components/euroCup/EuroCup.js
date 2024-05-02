import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import moment from "moment";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventTicketQuery,
	useGetCupEventTicketSummaryQuery,
	useGetMemberDepositQuery,
	useMultiUserPollTicketsMutation
} from "@ailab-desktop/service";
import { isDateRange } from "@ailab-desktop/common";
import { popBoxContext, userInfoContext } from "../common/context";
import { numFormatToDigits } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import paths from "../../router";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import { eventPeriods } from "../../datas/eventDef";
import usePopBox from "../hook/usePopBox";
import { DIRECTIONS_TYPE, predictTabs } from "./def";
import TicketOverview from "./TicketOverview";
import PredictLIst from "./predict/PredictLIst";
import TeamSelector from "./predict/TeamSelector";
import PredictionRecord from "./predict/PredictionRecord";
import Directions from "./Directions";
import RewardItem from "./reward/RewardItem";
import Schedule from "./schedule/Schedule";

const EuroCup = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [isShowMore, setIsShowMore] = useState(false);
	const [directionsType, setDirectionsType] = useState(
		DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
	);
	const [activeTab, setActiveTab] = useState(predictTabs.prediction);

	const {
		data: {
			data: {
				selectOptions = {},
				top24Team = [],
				roundOf16 = [],
				quarterFinals = [],
				semiFinals = [],
				final = []
			} = {}
		} = {}
	} = useGetCupEventPredictionSettingQuery({ langId: userInfo.langId });

	const { data: { data: ticketSummary = [] } = {} } =
		useGetCupEventTicketSummaryQuery(
			{ langId: userInfo.langId },
			{
				selectFromResult: ({ data: { data = [] } = {} }) => {
					const sortedData = [...data].sort(
						(a, b) => b.percentage - a.percentage
					);
					return {
						data: { data: sortedData }
					};
				}
			}
		);
	const { data: { data: tickets = {} } = {} } = useGetCupEventTicketQuery(
		null,
		{
			skip: !userInfo.isLogin,
			refetchOnMountOrArgChange: true
		}
	);

	const { data: { data: memberDepositList = [] } = {} } =
		useGetMemberDepositQuery(null, {
			skip: !userInfo.isLogin,
			refetchOnMountOrArgChange: true
		});

	const [pollTicketsMutation] = useMultiUserPollTicketsMutation();

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(selectOptions);

	const usedTickets = tickets.userTicketResult?.groupCountryTicket
		?.filter(({ countryId }) => countryId !== null)
		?.map(ticketObj => {
			const matchOption = options?.find(
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
		if (
			!selectedTeamId ||
			!ticketsNumber ||
			tickets.unUsedTickets < ticketsNumber
		)
			return;
		const selectedTeam = options?.find(
			({ countryId }) => countryId === Number(selectedTeamId)
		);
		const onSubmit = async () => {
			if (!userInfo.isLogin) return;
			try {
				const res = await pollTicketsMutation({
					userPollTicket,
					count
				}).unwrap();
				const { errorCode, message } = res;
				if (errorCode === 0) {
					setTicketsNumber("");
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
									alt="euro-logo"
								/>
								<div>
									<div className="record-item-team">
										<span className="team-title">
											{t("lbl_CupEvent_PredictionTeam")}
										</span>
										<div>
											<img
												src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
												alt={selectedTeam.imageName}
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
							<div className="first-text">
								<div>
									{t("lbl_Date")} (
									{memberDepositList[0].statementTime.slice(
										-6
									)}
									)
								</div>
								<div>{t("lbl_CupEvent_DepositID")}</div>
								<div> {t("lbl_DepositAmount")}</div>
							</div>
							<div>
								<div className="date">
									{memberDepositList.map(
										({ statementTime }) => (
											<div>
												{moment(statementTime).format(
													"YYYY/MM/DD HH:mm:ss"
												)}
											</div>
										)
									)}
								</div>
								<div className="user">
									{memberDepositList.map(({ transId }) => (
										<div>{transId}</div>
									))}
								</div>
								<div className="money">
									{memberDepositList.map(
										({ depositAmount }) => (
											<div>
												{numFormatToDigits(
													depositAmount,
													0
												)}
												<div>VND</div>
											</div>
										)
									)}
								</div>
							</div>
						</div>

						<div
							className="close-btn"
							onClick={() => setPopBox({ isOpen: false })}>
							<img
								src={`${bannerImgUrl}/desktop/img/event/eurocup/close-circle.png`}
								alt="close-circle"
							/>
						</div>
					</div>
				</div>
			)
		});
	};

	useEffect(() => {
		// 身份驗證未完成狀態
		if (userInfo.isLogin && tickets?.errorCode === 104) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("Label_CupEvent_Verify_Email_Phone"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, [tickets.errorCode]);

	useEffect(() => {
		if (!isDateRange(eventPeriods.euroCup)) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<img
				className="top-bn"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/top-bn-${userInfo.langId}.jpg`}
				alt={`top-bn-${userInfo.langId}`}
			/>
			<div className="prediction-wrapper">
				<div className="prediction-tab">
					<button
						className={classNames({
							active: activeTab === predictTabs.prediction
						})}
						onClick={() => setActiveTab(predictTabs.prediction)}>
						{t("lbl_CupEvent_Prediction")}
					</button>
					<button
						className={classNames({
							active: activeTab === predictTabs.schedule
						})}
						onClick={() => setActiveTab(predictTabs.schedule)}>
						{t("lbl_CupEvent_Schedule")}
					</button>
				</div>

				{activeTab === predictTabs.prediction && (
					<div className="prediction-content active">
						<div className="prediction-left">
							<div>
								{t("lbl_CupEvent_PredictionOfParticipant")}
							</div>
							<div>
								{t("lbl_CupEvent_PredictionOfParticipant_desc")}
							</div>
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
									alt="arrow-right"
								/>
							</a>
						</div>
						<PredictLIst ticketSummary={ticketSummary} />
					</div>
				)}

				{activeTab === predictTabs.schedule && (
					<Schedule
						activeTab={activeTab}
						top24Team={top24Team}
						roundOf16={roundOf16}
						quarterFinals={quarterFinals}
						semiFinals={semiFinals}
						final={final}
					/>
				)}
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
					alt="footer-bg"
				/>
			</div>
		</>
	);
};

export default EuroCup;
