import React from "react";
import { bannerImgUrl } from "../../config";

import FishingSnow from "./fishing.snow";

const FishingBanner = () => {
	return (
		<div className="mainBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/fishing/fishmainbanner.jpg`}
				alt="fishmainbanner"
			/>

			<FishingSnow />
		</div>
	);
};

export default FishingBanner;
