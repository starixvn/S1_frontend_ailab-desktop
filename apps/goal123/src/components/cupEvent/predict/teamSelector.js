import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, sportsImgUrl } from "../../../config";

const TeamSelector = ({
	options,
	selectedTeamId,
	ticketsNumber,
	setTicketsNumber,
	onChange,
	onSubmit
}) => {
	const { t } = useTranslation();
	return (
		<div className="ticket-filter">
			<div>
				<div className="title">{t("lbl_CupEvent_SelectYourTeam")}</div>
				<div className="filter-country">
					{options.map(({ countryId, countryName }) => (
						<button
							onClick={() => onChange(countryId)}
							className={
								countryId === selectedTeamId ? "active" : ""
							}
							key={countryId}>
							<img
								src={`${sportsImgUrl}/Country%20Team/${countryName}.png`}
								alt=""
							/>
							<span>{countryName}</span>
						</button>
					))}
				</div>
				<div className="title">
					{t("lbl_CupEvent_EnterTheNumberOfTickets")}
				</div>
				<div className="filter-bottom">
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
								src={`${bannerImgUrl}/desktop/img/event/eurocup/close.png`}
								alt=""
								onClick={() => setTicketsNumber("")}
							/>
						</button>
					</div>
					<button
						className="submit-btn"
						onClick={() => {
							onSubmit({
								userPollTicket: {
									// goal不分type,type固定帶0
									TicketType: 0,
									CountryId: selectedTeamId
								},
								count: Number(ticketsNumber)
							});
						}}>
						{t("lbl_Submit")}
					</button>
				</div>
			</div>
		</div>
	);
};

TeamSelector.propTypes = {
	options: PropTypes.objectOf(PropTypes.any).isRequired,
	selectedTeamId: PropTypes.objectOf(PropTypes.any).isRequired,
	ticketsNumber: PropTypes.string.isRequired,
	setTicketsNumber: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TeamSelector;
