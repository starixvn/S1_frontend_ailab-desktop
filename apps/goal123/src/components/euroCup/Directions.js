import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DIRECTIONS_TYPE } from "./def";
import { bannerImgUrl } from "../../config";

const Directions = ({ directionsType, setDirectionsType }) => {
	const { t } = useTranslation();
	return (
		<div
			className={classNames({
				terms: directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS,
				matches: directionsType === DIRECTIONS_TYPE.MATCHES
			})}
		>
			<div className="bottom-title">
				<div>
					<img
						src={`${bannerImgUrl}/desktop/img/event/eurocup/title-item.png`}
						alt="title-item"
					/>
					{directionsType ===
						DIRECTIONS_TYPE.TERMS_AND_CONDITIONS && (
						<span>{t("lbl_TermsConditions")}</span>
					)}
					{directionsType === DIRECTIONS_TYPE.MATCHES && (
						<span>{t("lbl_CupEvent_Matches_Title")}</span>
					)}
				</div>
				<div className="terms-btn">
					<button
						className={classNames({
							active:
								directionsType ===
								DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
						})}
						onClick={() =>
							setDirectionsType(
								DIRECTIONS_TYPE.TERMS_AND_CONDITIONS
							)
						}
					>
						{t("lbl_CupEvent_T&C")}
					</button>
					<button
						className={classNames({
							active: directionsType === DIRECTIONS_TYPE.MATCHES
						})}
						onClick={() =>
							setDirectionsType(DIRECTIONS_TYPE.MATCHES)
						}
					>
						{t("lbl_CupEvent_ExtraWin")}
					</button>
				</div>
			</div>
			{directionsType === DIRECTIONS_TYPE.TERMS_AND_CONDITIONS && (
				<ul className="info">
					<li key={1}>{t("lbl_CupEvent_Terms_And_Conditions_1")}</li>
					<li key={2}>{t("lbl_CupEvent_Terms_And_Conditions_2")}</li>
					<li key={3}>{t("lbl_CupEvent_Terms_And_Conditions_3")}</li>
					<li key={4}>{t("lbl_CupEvent_Terms_And_Conditions_4")}</li>
					<li key={5}>{t("lbl_CupEvent_Terms_And_Conditions_5")}</li>
					<li key={6}>{t("lbl_CupEvent_Terms_And_Conditions_6")}</li>
					<li key={7}>{t("lbl_CupEvent_Terms_And_Conditions_7")}</li>
					<li key={8}>{t("lbl_CupEvent_Terms_And_Conditions_8")}</li>
					<li key={9}>{t("lbl_CupEvent_Terms_And_Conditions_9")}</li>
					<li key={10}>
						{t("lbl_CupEvent_Terms_And_Conditions_10")}
					</li>
					<li key={11}>
						{t("lbl_CupEvent_Terms_And_Conditions_11")}
					</li>
					<li key={12}>
						{t("lbl_CupEvent_Terms_And_Conditions_12")}
					</li>
				</ul>
			)}
			{directionsType === DIRECTIONS_TYPE.MATCHES && (
				<>
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
							<div>{t("lbl_CupEvent_Matches_Sheet1")}</div>
							<div>{t("lbl_CupEvent_Matches_Sheet2")}</div>
							<div>{t("lbl_CupEvent_Matches_Sheet3")}</div>
							<div>{t("lbl_CupEvent_Matches_Sheet4")}</div>
							<div>{t("lbl_CupEvent_Matches_Sheet5")}</div>
							<div>{t("lbl_CupEvent_Matches_Sheet6")}</div>
						</div>
					</div>
					<div className="matches-info">
						<div className="subtitle">
							<div>{t("lbl_CupEvent_Matches_Subtitle1")}</div>
							<div>{t("lbl_CupEvent_Matches_Subtitle2")}</div>
						</div>
						<div>{t("lbl_CupEvent_Matches_desc1")}</div>
						<div>{t("lbl_CupEvent_Matches_desc2")} 3%</div>
						<div>{t("lbl_CupEvent_Matches_desc3")} 5%</div>
						<div>{t("lbl_CupEvent_Matches_desc4")} 8%</div>
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
