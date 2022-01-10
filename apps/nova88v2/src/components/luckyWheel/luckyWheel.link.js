import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { isDateRange, getCurrencyCode } from "../common/common";
import { eventPeriod, CURRENCY_PERMISSION } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId, currencyId }) => {
	const [display, setDisplay] = useState(true);
	const [bgImgOnLoad, setBgImgOnLoad] = useState(false);
	const [imgOnLoad, setImgOnLoad] = useState(false);
	const [winImgOnLoad, setWinImgOnLoad] = useState(false);

	const isPassCurrencyIdPermission = useMemo(() => {
		const _currencyId = currencyId ?? getCurrencyCode(langId);

		return CURRENCY_PERMISSION.includes(_currencyId);
	}, [currencyId, langId]);

	if (!isPassCurrencyIdPermission || !isInPeriod || !display) return null;

	return (
		<div className="eventLink">
			{bgImgOnLoad && imgOnLoad && winImgOnLoad && (
				<button
					className="icon icon-close"
					onClick={() => setDisplay(false)}
				/>
			)}

			<div
				onClick={() => navigate(`/${langId}/${path.luckyWheel.root}`)}
				className="wheelModule">
				<img
					src={`${bannerImgUrl}/desktop/img/event/wheel/eventlinkbg.png`}
					alt="luckywheel-img-eventlinkbg"
					onLoad={() => setBgImgOnLoad(true)}
				/>
				<img
					className="eventlinkimg"
					src={`${bannerImgUrl}/desktop/img/event/wheel/eventlinkimg.png`}
					alt="luckywheel-img-eventlinkimg"
					onLoad={() => setImgOnLoad(true)}
				/>
				<img
					className="eventlinkwin"
					src={`${bannerImgUrl}/desktop/img/event/wheel/eventlinkwin.png`}
					alt="luckywheel-img-eventlinkwin"
					onLoad={() => setWinImgOnLoad(true)}
				/>
			</div>
		</div>
	);
};

LuckyWheelLink.propTypes = {
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.oneOf([PropTypes.number]).isRequired
};

export default LuckyWheelLink;
