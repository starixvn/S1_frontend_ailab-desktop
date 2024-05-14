import React, { useState } from "react";
import classNames from "classnames";
import { string } from "prop-types";
import { Link } from "gatsby";
import { isDateRange } from "../common/common";
import { eventPeriod } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { eventPerios } from "../../datas/eventDef";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId, type }) => {
	const [display, setDisplay] = useState(true);
	const [homeImgOnLoad, setHomeImgOnLoad] = useState(true);

	if (!isInPeriod || !display) return null;

	if (type === "header")
		return (
			<Link
				to={`/${langId}/${path.luckyWheel.root}`}
				className="eventLink--top"
			>
				<img
					alt="angpao-header-link"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/h5/img/4.0/luckywheel.gif`}
				/>
			</Link>
		);

	return (
		homeImgOnLoad && (
			<div
				className={classNames("mywheel", {
					eurocup: isDateRange(eventPerios.euroCup)
				})}
			>
				<button
					style={{ zIndex: 50 }}
					className="icon-close-primary"
					onClick={() => setDisplay(false)}
				/>
				<Link to={`/${langId}/${path.luckyWheel.root}`}>
					<img
						className="mywheelImg"
						src={`${bannerImgUrl}/desktop/img/4.0/luckywheel.gif`}
						onLoad={() => setHomeImgOnLoad(true)}
						alt="home-wheel-img"
					/>
				</Link>
			</div>
		)
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
