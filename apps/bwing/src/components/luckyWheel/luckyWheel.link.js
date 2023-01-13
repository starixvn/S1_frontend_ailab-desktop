import React, { useState } from "react";
import { string } from "prop-types";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId, type }) => {
	const [display, setDisplay] = useState(true);
	const [homeImgOnLoad, setHomeImgOnLoad] = useState(false);
	const [homeImgWOnLoad, sethomeImgWOnLoad] = useState(false);

	if (!isInPeriod || !display) return null;

	if (type === "header")
		return (
			<Link
				to={`/${langId}/${path.luckyWheel.root}`}
				className="eventLink--top"
			>
				<img
					alt="angpao-header-link"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/event/wheel/eventlink-top.png`}
				/>
			</Link>
		);

	return (
		<div className="mywheel">
			{homeImgOnLoad && homeImgWOnLoad && (
				<div
					style={{ zIndex: 50 }}
					className="mywheelClose"
					onClick={() => setDisplay(false)}
				>
					X
				</div>
			)}
			<Link to={`/${langId}/${path.luckyWheel.root}`}>
				<img
					className="mywheelImg"
					src={`${bannerImgUrl}/desktop/img/luckybox/homeImg.png`}
					onLoad={() => setHomeImgOnLoad(true)}
					alt="home-wheel-img"
				/>
				<img
					className="mywheelImgw"
					src={`${bannerImgUrl}/desktop/img/luckybox/homeImg-w.png`}
					onLoad={() => sethomeImgWOnLoad(true)}
					alt="home-wheel-img-w"
				/>
			</Link>
		</div>
	);
};

LuckyWheelLink.defaultProps = {
	langId: "",
	type: ""
};

LuckyWheelLink.propTypes = {
	langId: string,
	type: string
};

export default LuckyWheelLink;
