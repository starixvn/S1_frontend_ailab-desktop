import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";
import mysteryhomeImg from "../../styles/img/mystery/homeImg.png";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const MysteryBoxLink = ({ to }) => {
	const [display, setDisplay] = useState(true);

	if (!isInPeriod) return null;

	return display ? (
		<div className="mysteryArea">
			<button onClick={() => setDisplay(false)} className="mysteryClose">
				X
			</button>
			<Link to={to} alt="money" className="money">
				<img
					className="mysteryImg"
					src={mysteryhomeImg}
					alt="angpowlink"
				/>
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
			</Link>
		</div>
	) : null;
};

MysteryBoxLink.propTypes = {
	to: PropTypes.string.isRequired
};

export default MysteryBoxLink;
