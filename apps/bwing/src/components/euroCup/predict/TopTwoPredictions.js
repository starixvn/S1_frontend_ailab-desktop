import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import PropTypes from "prop-types";
import { isDateRange } from "@ailab-desktop/common";
import { bannerImgUrl, sportsImgUrl } from "../../../config";
import { eventPerios } from "../../../datas/eventDef";
import { predictTabs } from "../def";
import Schedule from "../schedule/schedule";

const TopTwoPredictions = ({
	predictScoreList,
	isPredict,
	teamScore,
	top24Team,
	roundOf16,
	quarterFinals,
	semiFinals,
	final,
	setTeamScore,
	onSubmit
}) => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState(predictTabs.prediction);

	let homeTeam;
	let awayTeam;
	for (const item of predictScoreList) {
		if (item.team === "Home" && !homeTeam) {
			homeTeam = item;
		} else if (item.team === "Away" && !awayTeam) {
			awayTeam = item;
		}
		if (homeTeam && awayTeam) break;
	}

	return (
		<div
			className={classNames("center-wrapper", {
				submit: isDateRange(eventPerios.predictScore)
			})}>
			<div className="center-btn">
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
			<img
				className="cup"
				src={`${bannerImgUrl}/desktop/img/event/eurocup/cup.png`}
				alt="cup"
			/>
			<div
				className={classNames("center-content", {
					active: activeTab === predictTabs.prediction
				})}>
				<div className="center-text">
					<span>{t("lbl_CupEvent_Prediction_Banner_Desc1")}</span>
					<span>{t("lbl_CupEvent_Prediction_Banner_Desc2")}</span>
					<span>{t("lbl_CupEvent_Prediction_Banner_Desc3")}</span>
					<span>{t("lbl_CupEvent_Prediction_Banner_Desc4")}</span>
				</div>
				<div className="center-score">
					<div className="score-country">
						<div>
							{/* 冠亞軍未知狀況score-flag加上unknown */}
							<div
								className={classNames("score-flag", {
									unknown: !isDateRange(
										eventPerios.predictScore
									)
								})}>
								<img
									src={`${sportsImgUrl}/Country%20Team/${homeTeam?.teamDetail.imageName}`}
									alt={homeTeam?.teamDetail.countryName}
								/>
							</div>

							{/* 冠亞軍未知狀況先用score-text等冠亞出來換成score-input */}
							{isDateRange(eventPerios.predictScore) ? (
								<div
									className={classNames("score-input", {
										check: isPredict
									})}>
									<input
										type="number"
										name="score"
										placeholder={t(
											"lbl_CupEvent_PleaseFillOut"
										)}
										value={teamScore.homeTeamScore}
										onChange={e =>
											setTeamScore(prev => ({
												...prev,
												homeTeamScore: e.target.value
											}))
										}
									/>
								</div>
							) : (
								<div className="score-text">
									{t("lbl_CupEvent_Prediction_HideTip")}
								</div>
							)}
						</div>
						<div className="vs">
							<span>vs</span>
							<span>:</span>
						</div>
						<div>
							{/*
									冠亞軍未知狀況score-flag classname加上unknown
									*/}
							<div
								className={classNames("score-flag", {
									unknown: !isDateRange(
										eventPerios.predictScore
									)
								})}>
								<img
									src={`${sportsImgUrl}/Country%20Team/${awayTeam?.teamDetail.imageName}`}
									alt={awayTeam?.teamDetail.countryName}
								/>
							</div>
							{isDateRange(eventPerios.predictScore) ? (
								<div
									className={classNames("score-input", {
										check: isPredict
									})}>
									<input
										type="number"
										name="score"
										placeholder={t(
											"lbl_CupEvent_PleaseFillOut"
										)}
										value={teamScore.awayTeamScore}
										onChange={e =>
											setTeamScore(prev => ({
												...prev,
												awayTeamScore: e.target.value
											}))
										}
									/>
								</div>
							) : (
								<div className="score-text">
									{t("lbl_CupEvent_Prediction_HideTip")}
								</div>
							)}
						</div>
					</div>
				</div>
				{isDateRange(eventPerios.predictScore) && (
					<button
						onClick={() => onSubmit()}
						className={classNames("submit-btn", {
							check: isPredict
						})}>
						{t("lbl_Submit")}
					</button>
				)}

				<div className="center-tip">
					{t("lbl_CupEvent_Prediction_desc")}
				</div>
			</div>
			<Schedule
				activeTab={activeTab}
				top24Team={top24Team}
				roundOf16={roundOf16}
				quarterFinals={quarterFinals}
				semiFinals={semiFinals}
				final={final}
			/>
		</div>
	);
};

TopTwoPredictions.propTypes = {
	predictScoreList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isPredict: PropTypes.bool.isRequired,
	teamScore: PropTypes.objectOf(PropTypes.any).isRequired,
	top24Team: PropTypes.arrayOf(PropTypes.any).isRequired,
	roundOf16: PropTypes.arrayOf(PropTypes.any).isRequired,
	quarterFinals: PropTypes.arrayOf(PropTypes.any).isRequired,
	semiFinals: PropTypes.arrayOf(PropTypes.any).isRequired,
	final: PropTypes.arrayOf(PropTypes.any).isRequired,
	setTeamScore: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TopTwoPredictions;
