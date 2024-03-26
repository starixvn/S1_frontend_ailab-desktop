import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import paths from "../../router";
import {
	api_cupEvent_GetCupEventPredictionSetting,
	api_cupEvent_GetCupEventTicket,
	api_cupEvent_GetCupEventTicketSummary,
	api_cupEvent_GetMemberDeposit,
	api_cupEvent_MultiUserPollTickets
} from "../../service/api/cupEvent";
import { userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import PredictList from "./predictLIst";
import TicketOverview from "./ticketOverview";
import TeamSelector from "./teamSelector";
import PredictionRecord from "./predictionRecord";
import { DIRECTIONS_TYPE } from "./def";
import Directions from "./directions";
import RewardItem from "./RewardItem";
import { bannerImgUrl } from "../../config";

const CupEvent = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [predictionSetting, setPredictionSetting] = useState(null);
	const [tickets, setTickets] = useState({});
	const [memberDeposit, setMemberDeposit] = useState(0);
	const [ticketSummary, setTicketSummary] = useState([]);
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const [ticketsNumber, setTicketsNumber] = useState("");
	const [isShowMore, setIsShowMore] = useState(true);
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
				setMemberDeposit(data);
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

	const handleSelectTicketSubmit = async ({ userPollTicket, count }) => {
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
			} else {
				errorPopBox(message || "error", errorCode);
			}
		} catch (error) {
			errorPopBox(error);
		}
	};

	const combineGroups = data => [].concat(...Object.values(data ?? {}));

	const options = combineGroups(tickets?.selectOptions);
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
	console.log("isShowMore", isShowMore);
	useEffect(() => {
		getCupEventPredictionSetting({ langId: userInfo.langId });
		getCupEventTicket();
		getMemberDeposit();
		getTicketsSummary();
	}, []);

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
					<a className="deposit-btn-a">
						<span
							onClick={() => navigate(`/${paths.deposit.root}`)}>
							{t("lbl_DepositNow")}
						</span>
						<img
							src={`${bannerImgUrl}/desktop/img/event/eurocup/arrow-right.png`}
							alt=""
						/>
					</a>
				</div>
				<PredictList ticketSummary={ticketSummary} />
			</div>
			<div className="ticket-wrapper">
				<TicketOverview tickets={tickets} />
				<TeamSelector
					options={options}
					selectedTeamId={selectedTeamId}
					ticketsNumber={ticketsNumber}
					setTicketsNumber={setTicketsNumber}
					onChange={setSelectedTeamId}
					onSubmit={handleSelectTicketSubmit}
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

export default CupEvent;
