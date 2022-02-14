import React, { useState } from "react";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const AngpowLink = ({ to, langId }) => {
	const [display, setDisplay] = useState(true);
	const [buttonDisplay, setButtonDisplay] = useState(false);

	if (!isInPeriod) return null;

	let eventTextImg = "";
	if (langId === "vn") {
		eventTextImg = "../../styles/img/event/eventlink_vn.png";
	} else {
		eventTextImg = "../../styles/img/event/eventlink_en.png";
	}

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
						src={eventTextImg}
						alt="eventlink"
						onLoad={() => setButtonDisplay(true)}
					/>
				</Link>
			</div>
		);

	return null;
};
export default AngpowLink;
