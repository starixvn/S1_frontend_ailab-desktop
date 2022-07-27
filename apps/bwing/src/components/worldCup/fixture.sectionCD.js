import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const panel = "up";

const SectionCD = ({ getTeamList }) => {
	const { t } = useTranslation();

	return (
		<div className="groupMap">
			<div className="groupModule">
				<div className="name">
					<span>C</span>
					{t("worldCup.group")}
				</div>
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "left",
						event: "top32Team",
						group: "C"
					})}
				</div>
			</div>
			<div className="round16">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "roundOf16",
						group: "C"
					})}
				</div>
			</div>
			<div className="quarter">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "quarterFinals",
						group: "C"
					})}
				</div>
			</div>
			<div className="semi">
				<div className="list">
					<div className="border" />
				</div>
			</div>
			<div className="space" />
			<div className="semire">
				<div className="list">
					<div className="border" />
				</div>
			</div>
			<div className="quarterre">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "quarterFinals",
						group: "D"
					})}
				</div>
			</div>
			<div className="round16re">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "roundOf16",
						group: "D"
					})}
				</div>
			</div>
			<div className="groupModulere">
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "right",
						event: "top32Team",
						group: "D"
					})}
				</div>
				<div className="name">
					<span>D</span>
					{t("worldCup.group")}
				</div>
			</div>
		</div>
	);
};

SectionCD.propTypes = {
	getTeamList: PropTypes.func.isRequired
};

export default SectionCD;
