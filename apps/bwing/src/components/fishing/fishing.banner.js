import React from "react";
import { bannerImgUrl } from "../../config";

const FishingBanner = () => {
	return (
		<div className="lobbybanner">
			<img
				src={`${bannerImgUrl}/desktop/img/fishinglobby/fishing-banner.jpg`}
				alt="bannerImg"
			/>
			<div className="ball1">
				<img
					className="ballImg"
					src={`${bannerImgUrl}/desktop/img/fishinglobby/money1.png`}
					alt="money2Img"
				/>
			</div>
			<div className="ball1 ball2">
				<img
					className="ballImg"
					src={`${bannerImgUrl}/desktop/img/fishinglobby/money2.png`}
					alt="money2Img"
				/>
			</div>
		</div>
	);
};

export default FishingBanner;
