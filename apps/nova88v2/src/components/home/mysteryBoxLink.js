import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../mysteryBox/mysteryBox.def";
import imgEventlink from "../../styles/img/event/mysterybox/eventlink.png";

import { eventPeriodEuro } from "../../datas/euroDef";
import imgEventlinkEuro from "../../styles/img/euro/eventlink.png";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);
const isInPeriodEuro = isDateRange(null, eventPeriodEuro.endDate);

const MysteryBoxLink = ({ to }) => {
	const [display, setDisplay] = useState(true);
	const [buttonDisplay, setButtonDisplay] = useState(false);

	if (!isInPeriod) return null;

	if (display)
		return (
			<div className="eventLink">
				{buttonDisplay ? (
					<button
						className="icon icon-close"
						onClick={() => setDisplay(false)}
					/>
				) : null}
				<Link to={to}>
					<img
						src={isInPeriodEuro ? imgEventlinkEuro : imgEventlink}
						alt="eventlink"
						onLoad={() => setButtonDisplay(true)}
					/>
				</Link>
			</div>
		);

	return null;
};

MysteryBoxLink.propTypes = {
	to: PropTypes.string.isRequired
};

export default MysteryBoxLink;
