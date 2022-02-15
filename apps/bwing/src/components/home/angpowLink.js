import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const AngpowLink = ({ to, langId }) => {
	const [display, setDisplay] = useState(true);

	let eventlinkImg = "";
	if (langId === "vn") {
		eventlinkImg = "../../styles/img/newyear/money_vn.png";
	} else {
		eventlinkImg = "../../styles/img/newyear/money_en.png";
	}

	if (!isInPeriod) return null;

	return display ? (
		<div className="angPaoArea">
			<button onClick={() => setDisplay(false)} className="angPao_close">
				X
			</button>
			<Link to={to} alt="money" className="money">
				<img className="box" src={eventlinkImg} alt="angpowlink" />
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
	to: PropTypes.string.isRequired,
	langId: PropTypes.string.isRequired
};

export default AngpowLink;
