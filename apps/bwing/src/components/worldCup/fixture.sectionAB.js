import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const panel = "up";

const SectionAB = ({ getTeamList }) => {
	const { t } = useTranslation();

	return (
		<div className="groupMap">
			<div className="groupModule">
				<div className="name">
					<span>A</span>
					{t("worldCup.group")}
				</div>
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "left",
						event: "top32Team",
						group: "A"
					})}
				</div>
			</div>
			<div className="round16">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "roundOf16",
						group: "A"
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
						group: "A"
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
						group: "AC"
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
					{getTeamList({ place: "left", event: "final" })}
					<div className="border" />
					{getTeamList({ place: "right", event: "final" })}
				</div>
				<div className="prizeModule">
					<div className="title">{t("worldCup.final")}</div>
					<div className="prize">
						<span>VND</span> 3,388,000,000
					</div>
				</div>
			</div>
			<div className="semire">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "semiFinals",
						group: "BD"
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
						group: "B"
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
						group: "B"
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
						group: "B"
					})}
				</div>
				<div className="name">
					<span>B</span>
					{t("worldCup.group")}
				</div>
			</div>
		</div>
	);
};

SectionAB.propTypes = {
	getTeamList: PropTypes.func.isRequired
};

export default SectionAB;
