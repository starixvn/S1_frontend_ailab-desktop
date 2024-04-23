import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ProgressBar = ({ cur, target }) => {
	const { t } = useTranslation();
	return (
		<div style={{ width: "360px", height: "360px" }}>
			<CircularProgressbarWithChildren
				value={(cur / target) * 100}
				counterClockwise
				strokeWidth={5}
				styles={{
					root: {},
					path: {
						stroke: "gold"
					},
					trail: {
						stroke: "#102FAC",
						strokeLinecap: "butt",
						transform: "rotate(0.25turn)",
						transformOrigin: "center center"
					},
					text: {
						fill: "#f88",
						fontSize: "6px"
					}
				}}
			>
				<div
					style={{
						fontSize: 22,
						fontWeight: 600,
						color: "#fff"
					}}
				>
					{t("lbl_CupEvent_CurrentlyAccumulated")}
				</div>
				<div
					style={{
						fontSize: 48,
						fontWeight: "bold",
						color: "#102FAC"
					}}
				>
					<span style={{ color: "#F9D64B" }}>{cur}</span>/
					<span>{target}</span>
				</div>
			</CircularProgressbarWithChildren>
		</div>
	);
};

ProgressBar.propTypes = {
	cur: PropTypes.number.isRequired,
	target: PropTypes.number.isRequired
};

export default ProgressBar;
