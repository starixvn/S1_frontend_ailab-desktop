import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { bannerImgUrl } from "../../config";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../mysteryBox/mysteryBox.def";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

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
						src={`${bannerImgUrl}/desktop/img/event/mysterybox/eventlink.png`}
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
