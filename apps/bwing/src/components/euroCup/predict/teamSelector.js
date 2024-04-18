import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isDateRange } from "@ailab-desktop/common";
import { bannerImgUrl, sportsImgUrl } from "../../../config";
import { eventPerios } from "../../../datas/eventDef";

const TeamSelector = ({
	options,
	selectedTeamId,
	ticketsNumber,
	tickets,
	setTicketsNumber,
	onChange,
	onSubmit
}) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="prediction-title">
				{t("lbl_CupEvent_SelectYourTeam")}
			</div>
			{/* 預測活動結束filter加上close顯示活動結束樣式 */}
			<div
				className={classNames("filter", {
					close: !isDateRange(eventPerios.prediction)
				})}
			>
				<div className="close-text">
					{t("lbl_CupEvent_Prediction_DateLineTip")}
				</div>

				{options?.map(({ countryId, countryName, imageName }) => (
					<div
						className={classNames("filter-item", {
							active: countryId === Number(selectedTeamId)
						})}
						onClick={() => onChange(countryId.toString())}
						key={countryId}
					>
						<img
							src={`${sportsImgUrl}/Country%20Team/${imageName}`}
							alt={imageName}
						/>
						<span>{countryName}</span>
					</div>
				))}
			</div>
			<div className="prediction-title">
				{t("lbl_CupEvent_EnterTheNumberOfTickets")}
			</div>
			<div className="enter-box">
				<div className="number-bar">
					<input
						type="number"
						className="input-number"
						placeholder={t("lbl_CupEvent_PleaseFillOut")}
						value={ticketsNumber}
						onChange={e => setTicketsNumber(e.target.value)}
					/>
					<button className="close-btn">
						<img
							src={`${bannerImgUrl}/desktop/img/event/eurocup/close-icon.png`}
							alt="close"
							onClick={() => setTicketsNumber("")}
						/>
					</button>
				</div>
				<div className="votes">
					{t("lbl_CupEvent_RemainingVotes")} :{" "}
					<span>{tickets?.unUsedTickets ?? 0}</span>
				</div>
				<button
					className={classNames("submit-btn", {
						close: !isDateRange(eventPerios.prediction)
					})}
					onClick={() => {
						onSubmit({
							userPollTicket: {
								// goal不分type,type固定帶0
								TicketType: 0,
								CountryId: Number(selectedTeamId)
							},
							count: Number(ticketsNumber)
						});
					}}
				>
					{t("lbl_Submit")}
				</button>
			</div>
		</>
	);
};

TeamSelector.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any).isRequired,
	selectedTeamId: PropTypes.string.isRequired,
	ticketsNumber: PropTypes.string.isRequired,
	tickets: PropTypes.objectOf(PropTypes.any).isRequired,
	setTicketsNumber: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TeamSelector;
