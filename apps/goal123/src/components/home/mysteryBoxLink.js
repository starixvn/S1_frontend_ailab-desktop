import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../mysteryBox/mysteryBox.def";
// import imgEventlinkEn from "../../styles/img/event/box/eventlink.png";
// import imgEventlinkVn from "../../styles/img/event/box/eventlink_vn.png";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const MysteryBoxLink = ({ to, langId }) => {
	const [display, setDisplay] = useState(true);
	const [buttonDisplay, setButtonDisplay] = useState(false);

	if (!isInPeriod) return null;

	// const imgEventlink = {
	// 	en: imgEventlinkEn,
	// 	vn: imgEventlinkVn
	// }[langId];

	if (display)
		return (
			<div className="eventLink goldbox">
				{buttonDisplay ? (
					<button
						className="icon icon-close"
						onClick={() => setDisplay(false)}
					/>
				) : null}
				<Link to={to}>
					<img
						// src={imgEventlink}
						src=""
						alt="eventlink"
						onLoad={() => setButtonDisplay(true)}
					/>
				</Link>
			</div>
		);

	return null;
};

MysteryBoxLink.propTypes = {
	to: PropTypes.string.isRequired,
	langId: PropTypes.string.isRequired
};
export default MysteryBoxLink;
