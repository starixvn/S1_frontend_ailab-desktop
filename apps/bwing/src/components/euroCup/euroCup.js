import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import {
	useGetCupEventPredictionSettingQuery,
	useGetCupEventPredictScoreQuery,
	useGetCupEventTicketQuery,
	useMultiUserPollTicketsMutation,
	usePredictCupEventScoreMutation
} from "@ailab-desktop/service";
import { navigate } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import { bannerImgUrl, sportsImgUrl } from "../../config";
import TopContent from "./topContent";
import TopTwoPredictions from "./predict/TopTwoPredictions";
import Mission from "./mission";
import PredictionRecord from "./predict/predictionRecord";
import { popBoxContext, userInfoContext } from "../common/context";
import TeamSelector from "./predict/teamSelector";
import usePopBox from "../hook/usePopBox";
import Directions from "./directions";
import { defPopBoxType } from "../common/defPopBoxType";
import { eventPerios } from "../../datas/eventDef";

const EuroCup = () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [homeTeamScore, setHomeTeamScore] = useState("");
	const [awayTeamScore, setAwayTeamScore] = useState("");

	const { data: { data: predictionSettingData = {} } = {} } =
		useGetCupEventPredictionSettingQuery({ langId: userInfo.langId });

	const { data: { data: tickets = {} } = {} } = useGetCupEventTicketQuery(
		null,
		{
			skip: !userInfo.isLogin,
			refetchOnMountOrArgChange: true
		}
	);

	const {
		data: { data: { data: predictScoreList = [], isPredict } = {} } = {}
	} = useGetCupEventPredictScoreQuery(null);

	const [pollTicketsMutation] = useMultiUserPollTicketsMutation();

	const [predictCupEventScoreMutation] = usePredictCupEventScoreMutation();

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(predictionSettingData?.selectOptions);

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

	const handlePredictScore = async () => {
		const target = tickets?.promotionMission?.find(
			({ isCompleted }) => isCompleted === false
		);

		const onSubmitPredictionScore = async () => {
			try {
				const res = await predictCupEventScoreMutation({
					homeTeamScore,
					awayTeamScore
				}).unwrap();
				const { errorCode, message } = res;
				if (errorCode === 0) {
					setPopBox({ isOpen: false });
					setHomeTeamScore("");
					setAwayTeamScore("");
				} else {
					errorPopBox(message || "error", errorCode);
				}
			} catch (error) {
				errorPopBox(error);
			}
		};
		if (homeTeamScore === "" || awayTeamScore === "") return;
		if (target === -1) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				content: (
					<div id="popup" className="active">
						<div className="eurocuppop">
							<div className="eurocuppop-content">
								<div>
									{t("lbl_CupEvent_PredictScore_unCompleted")}
								</div>
								<button
									onClick={() => setPopBox({ isOpen: false })}
								>
									{t("lbl_OK")}
								</button>
							</div>
						</div>
					</div>
				)
			});
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				content: (
					<div id="popup" className="active">
						<div className="submitpop score">
							<div className="submitpop-wrapper active">
								<div className="submitpop-tip">
									{t("lbl_CupEvent_SentCantBeModified")}
								</div>
								<div className="submitpop-btn">
									<button onClick={onSubmitPredictionScore}>
										{t("lbl_OK")}
									</button>
									<button
										onClick={() =>
											setPopBox({ isOpen: false })
										}
									>
										{t("lbl_CANCEL")}
									</button>
								</div>
							</div>
						</div>
					</div>
				)
			});
		}
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
		const onSubmitPredictionTeam = async () => {
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
			className: "active",
			content: (
				<div id="popup" className="active">
					<div className="submitpop active">
						<div className="submitpop-wrapper active">
							<div>
								<div className="ticket-item">
									<img
										className="ticket-logo"
										src={`${bannerImgUrl}/desktop/img/event/eurocup/ticket-euro-logo.png`}
										alt="ticket-euro-logo"
									/>
									<div className="ticket-flag">
										<img
											src={`${sportsImgUrl}/Country%20Team/${selectedTeam.imageName}`}
											alt={selectedTeam.imageName}
										/>
										<span>{selectedTeam.countryName}</span>
									</div>
									<div className="ticket-votes">
										<span>{count}</span>
										<span>{t("lbl_CupEvent_Tickets")}</span>
									</div>
								</div>
							</div>

							<div className="submitpop-tip">
								{t("lbl_CupEvent_ConfirmMsg")}
							</div>
							<div className="submitpop-btn">
								<button onClick={onSubmitPredictionTeam}>
									{t("lbl_OK")}
								</button>
								<button
									onClick={() => setPopBox({ isOpen: false })}
								>
									{t("lbl_Cancel")}
								</button>
							</div>
						</div>
					</div>
				</div>
			)
		});
	};

	useEffect(() => {
		if (!isDateRange(eventPerios.euroCup)) {
			navigate("/");
		}
	}, []);

	return (
		<>
			<TopContent />
			<TopTwoPredictions
				predictScoreList={predictScoreList}
				isPredict={isPredict}
				homeTeamScore={homeTeamScore}
				awayTeamScore={awayTeamScore}
				setHomeTeamScore={setHomeTeamScore}
				setAwayTeamScore={setAwayTeamScore}
				onSubmit={handlePredictScore}
			/>
			<div
				className={classNames("mission-wrapper", {
					submit: isDateRange(eventPerios.predictScore)
				})}
			>
				<div className="mission-content">
					<div className="title">
						<span>{t("lbl_CupEvent_Mission")}</span>
					</div>
					<div className="mission-date">
						{t("lbl_CupEvent_Mission_Date")}
					</div>
					<Mission tickets={tickets} />
					<div className="prediction">
						<TeamSelector
							options={options}
							selectedTeamId={selectedTeamId}
							ticketsNumber={ticketsNumber}
							tickets={tickets}
							setTicketsNumber={setTicketsNumber}
							onChange={setSelectedTeamId}
							onSubmit={handleSubmitConfirmModalOpen}
						/>
						{usedTickets?.length > 0 && (
							<PredictionRecord usedTickets={usedTickets} />
						)}
					</div>
				</div>
			</div>
			<div className="bottom-bg" />
			<Directions />
		</>
	);
};

export default EuroCup;
