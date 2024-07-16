import React, { useState, useContext } from "react";
import { string } from "prop-types";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ type }) => {
	const [display, setDisplay] = useState(true);
	const { userInfo } = useContext(userInfoContext);

	if (!isInPeriod || !display) return null;

	if (type === "header")
		return (
			<Link
				to={`/${userInfo.langId}/${path.luckyWheel.root}`}
				className="eventLink--top">
				<img
					alt="angpao-header-link"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/event/wheel/eventlink-top.png`}
				/>
			</Link>
		);

	return (
		<div className="eventLink luckywheel">
			<button
				className="icon icon-close"
				onClick={() => setDisplay(false)}
			/>
			<Link to={`/${userInfo.langId}/${path.luckyWheel.root}`}>
				<img
					className="spin"
					src={`${bannerImgUrl}/desktop/img/event/retention/entrance.gif`}
					alt="retention-entrance"
				/>
			</Link>
		</div>
	);
};

export default LuckyWheelLink;

LuckyWheelLink.defaultProps = {
	type: ""
};

LuckyWheelLink.propTypes = {
	type: string
};
