import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../mysteryBox/mysteryBox.def";
import imgMysteryLinkEn from "../../styles/img/mystery/homeImg.png";
import imgMysteryLinkVn from "../../styles/img/mystery/homeImg_vn.png";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const MysteryBoxLink = ({ to, langId }) => {
	const [display, setDisplay] = useState(true);

	if (!isInPeriod) return null;

	const imgEventlink = {
		en: imgMysteryLinkEn,
		vn: imgMysteryLinkVn
	}[langId];

	return display ? (
		<div className="mysteryArea">
			<button onClick={() => setDisplay(false)} className="mysteryClose">
				X
			</button>
			<Link to={to} alt="money" className="money">
				<img
					className="mysteryImg"
					src={imgEventlink}
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
	to: PropTypes.string.isRequired,
	langId: PropTypes.string.isRequired
};

export default MysteryBoxLink;
