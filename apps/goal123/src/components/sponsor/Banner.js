import React from "react";
import { bannerImgUrl } from "../../config";

const AmbassadorBanner = () => {
	return (
		<div className="banner">
			<img
				src={`${bannerImgUrl}/desktop/img/ambassador/banner.jpg`}
				alt=""
			/>
		</div>
	);
};

export default AmbassadorBanner;
