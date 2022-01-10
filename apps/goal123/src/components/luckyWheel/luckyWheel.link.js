import React, { useState } from "react";
import { Link } from "@reach/router";
import { isDateRange } from "../common/common";
import { eventPeriod } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId }) => {
	const [display, setDisplay] = useState(true);
	const [spinImgOnLoad, setSpinImgOnLoad] = useState(false);
	const [innerImgOnLoad, setInnerImgOnLoad] = useState(false);

	if (!isInPeriod || !display) return null;

	return (
		<div className="eventLink wheel">
			{spinImgOnLoad && innerImgOnLoad && (
				<button
					className="icon icon-close"
					onClick={() => setDisplay(false)}
				/>
			)}

			<Link to={`/${langId}/${path.luckyWheel.root}`}>
				<img
					className="spin"
					src={`${bannerImgUrl}/desktop/img/event/wheel/eventlink/spin.png`}
					alt="spin"
					onLoad={() => setSpinImgOnLoad(true)}
				/>
				<img
					className="inner"
					src={`${bannerImgUrl}/desktop/img/event/wheel/eventlink/inner.png`}
					alt="inner"
					onLoad={() => setInnerImgOnLoad(true)}
				/>
			</Link>
		</div>
	);
};

export default LuckyWheelLink;
