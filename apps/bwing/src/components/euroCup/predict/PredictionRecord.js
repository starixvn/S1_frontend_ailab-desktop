import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, sportsImgUrl } from "../../../config";

const PredictionRecord = ({ usedTickets }) => {
	const { t } = useTranslation();
	return (
		<>
			<div className="prediction-title">
				{t("lbl_CupEvent_PredictionRecord")}
			</div>
			<div className="ticket">
				<div className="ticket-content">
					{usedTickets?.map(
						({ count, countryId, countryName, imageName }) => (
							<div className="ticket-item" key={countryId}>
								<img
									className="ticket-logo"
									src={`${bannerImgUrl}/desktop/img/event/eurocup/ticket-euro-logo.png`}
									alt="ticket-euro-logo"
								/>
								<div className="ticket-flag">
									<img
										src={`${sportsImgUrl}/Country%20Team/${imageName}`}
										alt={imageName}
									/>
									<span>{countryName}</span>
								</div>
								<div className="ticket-votes">
									<span>{count}</span>
									<span>{t("lbl_CupEvent_Tickets")}</span>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</>
	);
};
PredictionRecord.propTypes = {
	usedTickets: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default PredictionRecord;
