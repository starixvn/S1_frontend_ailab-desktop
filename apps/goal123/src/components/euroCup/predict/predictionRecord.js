import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { bannerImgUrl, sportsImgUrl } from "../../../config";

const PredictionRecord = ({ usedTickets, isShowMore, onShowMoreToggle }) => {
	const { t } = useTranslation();
	return (
		<div className="record active">
			<div className={`record-wrapper ${isShowMore ? "active" : ""}`}>
				<div className="title">
					{t("lbl_CupEvent_PredictionRecord")}
				</div>
				<div className="record-content">
					{usedTickets?.map(
						({ count, countryId, countryName, imageName }) => (
							<div className="record-item" key={countryId}>
								<div className="record-item-box">
									<img
										className="euro-logo"
										src={`${bannerImgUrl}/desktop/img/event/eurocup/euro-logo.png`}
										alt=""
									/>
									<div>
										<div className="record-item-team">
											<span className="team-title">
												{t(
													"lbl_CupEvent_PredictionTeam"
												)}
											</span>
											<div>
												<img
													src={`${sportsImgUrl}/Country%20Team/${imageName}`}
													alt=""
												/>
												<span>{countryName}</span>
											</div>
										</div>
										<div className="record-item-number">
											<span>
												{t(
													"lbl_CupEvent_NumberOfTickets"
												)}
											</span>
											<span>
												{count}{" "}
												{t("lbl_CupEvent_Tickets")}
											</span>
										</div>
									</div>
								</div>
							</div>
						)
					)}
				</div>
				<div
					className={`more-btn ${isShowMore ? "active" : ""}`}
					onClick={onShowMoreToggle}>
					{t("lbl_CupEvent_ShowMore")}
				</div>
			</div>
		</div>
	);
};

PredictionRecord.propTypes = {
	usedTickets: PropTypes.arrayOf(PropTypes.any).isRequired,
	isShowMore: PropTypes.bool.isRequired,
	onShowMoreToggle: PropTypes.func.isRequired
};

export default PredictionRecord;
