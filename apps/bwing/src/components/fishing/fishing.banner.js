import React from "react";

import bannerImg from "../../styles/img/fishinglobby/fishing-banner.jpg";
import money1Img from "../../styles/img/fishinglobby/money1.png";
import money2Img from "../../styles/img/fishinglobby/money2.png";

const FishingBanner = () => {
	return (
		<div className="lobbybanner">
			<img src={bannerImg} alt="bannerImg" />
			<div className="ball1">
				<img className="ballImg" src={money1Img} alt="money2Img" />
			</div>
			<div className="ball1 ball2">
				<img className="ballImg" src={money2Img} alt="money2Img" />
			</div>
		</div>
	);
};

export default FishingBanner;
