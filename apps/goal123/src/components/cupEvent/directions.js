import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DIRECTIONS_TYPE } from "./def";
import { bannerImgUrl } from "../../config";

const Directions = ({ directionsType, setDirectionsType }) => {
	const { t } = useTranslation();
	return (
		<div
			className={
				directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
					? "terms"
					: "matches"
			}>
			<div className="bottom-title">
				<div>
					<img
						src={`${bannerImgUrl}/desktop/img/event/eurocup/title-item.png`}
						alt=""
					/>
					<span>{t("lbl_TermsConditions")}</span>
				</div>
				<div className="terms-btn">
					<button
						className={
							directionsType ===
							DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
								? "active"
								: ""
						}
						onClick={() =>
							setDirectionsType(
								DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
							)
						}>
						{t("lbl_CupEvent_T&C")}
					</button>
					<button
						className={
							directionsType === DIRECTIONS_TYPE.MATCHES
								? "active"
								: ""
						}
						onClick={() =>
							setDirectionsType(DIRECTIONS_TYPE.MATCHES)
						}>
						{t("lbl_CupEvent_Matches")}
					</button>
				</div>
			</div>
			{directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS && (
				<ul className="info">
					<li>{t("lbl_CupEvent_Terms_And_Conditions_1")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_2")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_3")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_4")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_5")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_6")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_7")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_8")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_9")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_10")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_11")}</li>
					<li>{t("lbl_CupEvent_Terms_And_Conditions_12")}</li>
				</ul>
			)}
			{directionsType === DIRECTIONS_TYPE.MATCHES && (
				<>
					<div className="subtitle">
						{t("lbl_CupEvent_Matches_Subtitle")}
					</div>
					<div className="matches-item">
						<div>
							<div>{t("lbl_Bonus")}</div>
							<div>{t("lbl_CupEvent_BetType")}</div>
							<div>{t("lbl_CupEvent_MinPayout")}</div>
							<div>{t("lbl_CupEvent_MaxBonus")}</div>
							<div>{t("lbl_CupEvent_Product")}</div>
							<div>{t("lbl_CupEvent_Rollover")}</div>
						</div>
						<div>
							<div>3-8%</div>
							<div>FT.[HDP / FT.[O/U] / 1H.[HDP] / 1H.[O/U]</div>
							<div>VND 8,888</div>
							<div>VND 8,888,888</div>
							<div>Saba Sports only</div>
							<div>8x</div>
						</div>
					</div>
					<div className="matches-info">
						<div>{t("lbl_CupEvent_Matches_desc1")}</div>
						<div>{t("lbl_CupEvent_Matches_desc2")}</div>
						<div>{t("lbl_CupEvent_Matches_desc3")}</div>
						<div>{t("lbl_CupEvent_Matches_desc4")}</div>
					</div>
				</>
			)}
		</div>
	);
};

Directions.propTypes = {
	directionsType: PropTypes.number.isRequired,
	setDirectionsType: PropTypes.func.isRequired
};

export default Directions;
