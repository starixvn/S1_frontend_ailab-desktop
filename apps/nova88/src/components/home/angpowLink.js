import React, { useState } from "react";
import { Link } from "@reach/router";
import moment from "moment";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";

import eventlinkImg from "../../styles/img/event/eventlink.png";

const { startDate, endDate } = eventPeriod;
const currentDate = moment();
const isInPeriod = isDateRange(currentDate, startDate, endDate);

const AngpowLink = ({ to }) => {
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
						src={eventlinkImg}
						alt="eventlink"
						onLoad={() => setButtonDisplay(true)}
					/>
				</Link>
			</div>
		);

	return null;
};
export default AngpowLink;
