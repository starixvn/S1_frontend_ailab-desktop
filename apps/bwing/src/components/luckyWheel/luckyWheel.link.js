import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { isDateRange } from "../common/common";
import { eventPeriod } from "./luckyWheel.def";
import path from "../../router";

import homeImg from "../../styles/img/luckybox/homeImg.png";
import homeImgW from "../../styles/img/luckybox/homeImg-w.png";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId }) => {
	const [display, setDisplay] = useState(true);
	const [homeImgOnLoad, setHomeImgOnLoad] = useState(false);
	const [homeImgWOnLoad, sethomeImgWOnLoad] = useState(false);

	if (!isInPeriod || !display) return null;

	return (
		<div className="mywheel">
			{homeImgOnLoad && homeImgWOnLoad && (
				<div
					style={{ zIndex: 50 }}
					className="mywheelClose"
					onClick={() => setDisplay(false)}>
					X
				</div>
			)}
			<Link to={`/${langId}/${path.luckyWheel.root}`}>
				<img
					className="mywheelImg"
					src={homeImg}
					onLoad={() => setHomeImgOnLoad(true)}
					alt="home-wheel-img"
				/>
				<img
					className="mywheelImgw"
					src={homeImgW}
					onLoad={() => sethomeImgWOnLoad(true)}
					alt="home-wheel-img-w"
				/>
			</Link>
		</div>
	);
};

LuckyWheelLink.propTypes = {
	langId: PropTypes.string.isRequired
};

export default LuckyWheelLink;
