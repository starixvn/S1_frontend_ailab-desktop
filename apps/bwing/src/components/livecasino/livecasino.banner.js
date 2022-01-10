/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LiveCasinoBanner = ({ langId }) => {
	const imgUrl =
		{
			en: `${bannerImgUrl}/desktop/img/livelobby/livelobby-banner-en.jpg`,
			vn: `${bannerImgUrl}/desktop/img/livelobby/livelobby-banner-vn.jpg`
		}[langId] ||
		`${bannerImgUrl}/desktop/img/livelobby/livelobby-banner-en.jpg`;

	return (
		<div className="lobbybanner">
			<img src={imgUrl} alt="livecasino-banner" />
			<div className="ball1">
				<img
					className="ballImg"
					src={`${bannerImgUrl}/desktop/img/livelobby/money1.png`}
					alt="money1Img"
				/>
			</div>
			<div className="ball1 ball2">
				<img
					className="ballImg"
					src={`${bannerImgUrl}/desktop/img/livelobby/money2.png`}
					alt="money2Img"
				/>
			</div>
		</div>
	);
};

export default LiveCasinoBanner;

LiveCasinoBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
