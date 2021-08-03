import React from "react";
import config from "../../config";

import FishingSnow from "./fishing.snow";

const FishingBanner = () => {
	return (
		<div className="mainBanner">
			<img
				src={`${config.bannerImgUrl}/img/fishing/fishmainbanner.jpg`}
				alt="fishmainbanner"
			/>

			<FishingSnow />
		</div>
	);
};

export default FishingBanner;
