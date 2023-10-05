import React from "react";
import { bannerImgUrl } from "../../config";

const FishingBanner = () => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-fishing.jpg`}
				alt="fishing-banner-img"
			/>
		</div>
	);
};

export default FishingBanner;
