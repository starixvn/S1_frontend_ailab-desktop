import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const panel = "down";

const SectionEF = ({ getTeamList }) => {
	const { t } = useTranslation();

	return (
		<div className="groupMap">
			<div className="groupModule">
				<div className="name">
					<span>E</span>
					{t("worldCup.group")}
				</div>
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "left",
						event: "top32Team",
						group: "E"
					})}
				</div>
			</div>
			<div className="round16">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "roundOf16",
						group: "E"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.roundOf16")}</div>
					<div className="prize">
						<span>VND</span>288,000,000
					</div>
				</div>
			</div>
			<div className="quarter">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "quarterFinals",
						group: "E"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.quarterFinals")}</div>
					<div className="prize">
						<span>VND</span>688,000,000
					</div>
				</div>
			</div>
			<div className="semi">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "semiFinals",
						group: "EG"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.semiFinals")}</div>
					<div className="prize">
						<span>VND</span>888,000,000
					</div>
				</div>
			</div>
			<div className="final">
				<div className="list">
					{getTeamList({ place: "left", event: "3rdPlace" })}
					{getTeamList({ place: "right", event: "3rdPlace" })}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.3rdPlace")}</div>
					<div className="prize">
						<span>VND</span>1,388,000,000
					</div>
				</div>
			</div>
			<div className="semire">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "semiFinals",
						group: "FH"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.semiFinals")}</div>
					<div className="prize">
						<span>VND</span>888,000,000
					</div>
				</div>
			</div>
			<div className="quarterre">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "quarterFinals",
						group: "F"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.quarterFinals")}</div>
					<div className="prize">
						<span>VND</span>688,000,000
					</div>
				</div>
			</div>
			<div className="round16re">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "roundOf16",
						group: "F"
					})}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.roundOf16")}</div>
					<div className="prize">
						<span>VND</span>288,000,000
					</div>
				</div>
			</div>
			<div className="groupModulere">
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "right",
						event: "top32Team",
						group: "F"
					})}
				</div>
				<div className="name">
					<span>F</span>
					{t("worldCup.group")}
				</div>
			</div>
		</div>
	);
};

SectionEF.propTypes = {
	getTeamList: PropTypes.func.isRequired
};

export default SectionEF;
