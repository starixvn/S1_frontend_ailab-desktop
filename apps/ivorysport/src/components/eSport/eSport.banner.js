import React from "react";
import { bannerImgUrl } from "../../config";

const FishingBanner = () => {
	return (
		<div className="mainBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/esport/esport_mainbanner_bg.jpg`}
				alt="esport_mainbanner_bg"
			/>

			<div className="bannerInfo">
				<div className="text">
					<img
						src={`${bannerImgUrl}/desktop/img/esport/esport_logo.png `}
						alt="esport"
					/>
				</div>
				<div className="animation">
					<img
						className="leesin"
						src={`${bannerImgUrl}/desktop/img/esport/animation_img/leesin.png`}
						alt="leesin"
					/>
					<img
						className="spark"
						src={`${bannerImgUrl}/desktop/img/esport/animation_img/spark.png`}
						alt="esport"
					/>
				</div>
			</div>
		</div>
	);
};

export default FishingBanner;
