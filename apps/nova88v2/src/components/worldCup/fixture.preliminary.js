import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { defPreliminary, defEventClassName } from "./fixture.def";

const Preliminary = ({ panel, prediction }) => {
	const { t } = useTranslation();

	const sectionTeams = defPreliminary[panel];
	const getTeamList = ({ group, event }) => {
		const defSort = sectionTeams[event].find(el => el.group === group);
		const sortedTeams = prediction?.[event]
			?.filter(team => {
				if (defSort?.sort) {
					return team.sort === defSort?.sort;
				}
				return (
					team.sort >= defSort?.startSort &&
					team.sort <= defSort?.endSort
				);
			})
			.sort((a, b) => a.sort - b.sort);

		let teams = [];
		const arrLength = defSort?.sort
			? 1
			: defSort?.endSort - defSort?.startSort + 1;

		if (sortedTeams?.length === arrLength) {
			teams = sortedTeams?.map(team => (
				<div className="item" key={`${event}-${team.countryName}`}>
					<img
						src={`${bannerImgUrl}/img/flag/${team.imageName}`}
						alt={`${event}-${team.countryName}`}
					/>
					{team.countryName}
				</div>
			));
		} else {
			for (let i = 0; i < arrLength; i++) {
				teams.push(
					<div className="item" key={`${event}-${group}-${i}`}>
						<img
							src={`${bannerImgUrl}/img/flag/na.jpg`}
							alt={`${event}-${group}-${i}`}
						/>
					</div>
				);
			}
		}

		return (
			<div className={`group-${defEventClassName[event]}`}>
				{event === "top32Team" && (
					<div className="group-title">
						{t("worldCup.group")} {group}
					</div>
				)}
				{teams}
			</div>
		);
	};

	return (
		<div className={`group-${panel}`}>
			<div className={`group-prize ${panel}`}>
				<Prize t={t} />
			</div>
			<div className="group-col">
				<div className="group-row">
					{getTeamList({
						event: "top32Team",
						group: panel === "left" ? "A" : "B"
					})}
					{getTeamList({
						event: "roundOf16",
						group: panel === "left" ? "A" : "B"
					})}
					{getTeamList({
						event: "quarterFinals",
						group: panel === "left" ? "A" : "B"
					})}
					{getTeamList({
						event: "semiFinals",
						group: panel === "left" ? "AC" : "BD"
					})}
				</div>
				<div className="group-row">
					{getTeamList({
						event: "top32Team",
						group: panel === "left" ? "C" : "D"
					})}
					{getTeamList({
						event: "roundOf16",
						group: panel === "left" ? "C" : "D"
					})}
					{getTeamList({
						event: "quarterFinals",
						group: panel === "left" ? "C" : "D"
					})}
				</div>
			</div>
			<div className="group-col">
				<div className="group-row">
					{getTeamList({
						event: "top32Team",
						group: panel === "left" ? "E" : "F"
					})}
					{getTeamList({
						event: "roundOf16",
						group: panel === "left" ? "E" : "F"
					})}
					{getTeamList({
						event: "quarterFinals",
						group: panel === "left" ? "E" : "F"
					})}
					{getTeamList({
						event: "semiFinals",
						group: panel === "left" ? "EG" : "FH"
					})}
				</div>
				<div className="group-row">
					{getTeamList({
						event: "top32Team",
						group: panel === "left" ? "G" : "H"
					})}
					{getTeamList({
						event: "roundOf16",
						group: panel === "left" ? "G" : "H"
					})}
					{getTeamList({
						event: "quarterFinals",
						group: panel === "left" ? "G" : "H"
					})}
				</div>
			</div>
		</div>
	);
};

Preliminary.defaultProps = {
	prediction: null
};

Preliminary.propTypes = {
	panel: PropTypes.string.isRequired,
	prediction: PropTypes.objectOf(PropTypes.any)
};

const Prize = ({ t }) => (
	<>
		<div className="prize-col">
			<div className="prize">
				<div>{t("worldCup.USD")} 10,000</div>
				<div className="subtitle">{t("worldCup.groupStage1st")}</div>
			</div>
			<div className="prize">
				<div>{t("worldCup.USD")} 8,000</div>
				<div className="subtitle">{t("worldCup.groupStage2nd")}</div>
			</div>
		</div>
		<div className="prize-row">
			<div className="prize">
				<div>{t("worldCup.USD")} 18,000</div>
				<div className="subtitle">{t("worldCup.roundOf16")}</div>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/prize-deco.svg`}
					alt="prize-deco"
				/>
			</div>
		</div>
		<div className="prize-row">
			<div className="prize">
				<div>{t("worldCup.USD")} 28,000</div>
				<div className="subtitle">{t("worldCup.quarterFinals")}</div>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/prize-deco.svg`}
					alt="prize-deco"
				/>
			</div>
		</div>
		<div className="prize-row">
			<div className="prize">
				<div>{t("worldCup.USD")} 38,000</div>
				<div className="subtitle">{t("worldCup.semiFinals")}</div>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/prize-deco.svg`}
					alt="prize-deco"
				/>
			</div>
		</div>
	</>
);

Prize.propTypes = {
	t: PropTypes.func.isRequired
};

export default Preliminary;
