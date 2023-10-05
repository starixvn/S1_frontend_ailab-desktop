import React from "react";
import { bannerImgUrl } from "../../config";

const EsportBanner = () => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-esports.jpg`}
				alt="esport-banner-img"
			/>
		</div>
	);
};

export default EsportBanner;
