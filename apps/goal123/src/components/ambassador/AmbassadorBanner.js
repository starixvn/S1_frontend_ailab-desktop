import React from "react";
import { bannerImgUrl } from "../../config";

const AmbassadorBanner = () => {
	return (
		<div className="banner">
			<img
				src={`${bannerImgUrl}/desktop/img/ambassador/banner.jpg`}
				alt="ambassador-banner"
			/>
		</div>
	);
};

export default AmbassadorBanner;
