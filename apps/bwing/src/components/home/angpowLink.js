import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import moment from "moment";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";

const { startDate, endDate } = eventPeriod;
const currentDate = moment();
const isInPeriod = isDateRange(currentDate, startDate, endDate);

const AngpowLink = ({ to }) => {
	const [display, setDisplay] = useState(true);

	if (!isInPeriod) return null;

	return display ? (
		<div className="angPaoArea">
			<button onClick={() => setDisplay(false)} className="angPao_close">
				X
			</button>
			<Link to={to} alt="money" className="money">
				<div className="box" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
				<div className="l" />
			</Link>
		</div>
	) : null;
};

AngpowLink.propTypes = {
	to: PropTypes.string.isRequired
};

export default AngpowLink;
