import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const panel = "down";

const SectionGH = ({ getTeamList }) => {
	const { t } = useTranslation();

	return (
		<div className="groupMap">
			<div className="groupModule">
				<div className="name">
					<span>G</span>
					{t("worldCup.group")}
				</div>
				<div className="list">
					<div className="border" />
					{getTeamList({
						panel,
						place: "left",
						event: "top32Team",
						group: "G"
					})}
				</div>
			</div>
			<div className="round16">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "roundOf16",
						group: "G"
					})}
				</div>
			</div>
			<div className="quarter">
				<div className="list">
					{getTeamList({
						panel,
						place: "left",
						event: "quarterFinals",
						group: "G"
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
						group: "H"
					})}
				</div>
			</div>
			<div className="round16re">
				<div className="list">
					{getTeamList({
						panel,
						place: "right",
						event: "roundOf16",
						group: "H"
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
						group: "H"
					})}
				</div>
				<div className="name">
					<span>H</span>
					{t("worldCup.group")}
				</div>
			</div>
		</div>
	);
};

SectionGH.propTypes = {
	getTeamList: PropTypes.func.isRequired
};

export default SectionGH;
