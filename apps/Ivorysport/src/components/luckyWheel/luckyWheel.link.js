import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Link, navigate } from "gatsby";
import { isDateRange, getCurrencyCode } from "../common/common";
import { eventPeriod, CURRENCY_PERMISSION } from "./luckyWheel.def";
import path from "../../router";
import { bannerImgUrl } from "../../config";

const { startDate, endDate } = eventPeriod;
const isInPeriod = isDateRange(startDate, endDate);

const LuckyWheelLink = ({ langId, currencyId, type }) => {
	const [display, setDisplay] = useState(true);
	const [bgImgOnLoad, setBgImgOnLoad] = useState(false);
	const [imgOnLoad, setImgOnLoad] = useState(false);
	const [winImgOnLoad, setWinImgOnLoad] = useState(false);

	const isPassCurrencyIdPermission = useMemo(() => {
		const _currencyId = currencyId ?? getCurrencyCode(langId);

		return CURRENCY_PERMISSION.includes(_currencyId);
	}, [currencyId, langId]);

	if (!isPassCurrencyIdPermission || !isInPeriod || !display) return null;

	if (type === "header")
		return (
			<Link
				to={`/${langId}/${path.luckyWheel.root}`}
				className="eventLink--top">
				<img
					alt="angpao-header-link"
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/event/wheel/eventlink-top.png`}
				/>
			</Link>
		);

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

LuckyWheelLink.defaultProps = {
	currencyId: null,
	type: ""
};

LuckyWheelLink.propTypes = {
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number,
	type: PropTypes.string
};

export default LuckyWheelLink;
