import React from "react";
import { bannerImgUrl } from "../../config";

const LotteryBanner = () => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-lottery.jpg`}
				alt="lottery-banner-img"
			/>
		</div>
	);
};

export default LotteryBanner;
