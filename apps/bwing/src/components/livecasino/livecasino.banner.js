/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { bannerImgUrl } from "../../config";

const LiveCasinoBanner = () => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-casino.jpg`}
				alt="casino-banner-img"
			/>
		</div>
	);
};

export default LiveCasinoBanner;
