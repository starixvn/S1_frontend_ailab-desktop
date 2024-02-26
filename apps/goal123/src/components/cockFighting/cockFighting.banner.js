import React from "react";
import { bannerImgUrl } from "../../config";

const CockFightingBanner = () => {
	return (
		<div className="aniBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/cockfighting/cockfighting-bn.png`}
				alt="games-banner-img"
			/>

			<div className="items">
				<img src={`${bannerImgUrl}/desktop/img/cloud-red.png`} alt="" />
				<img
					src={`${bannerImgUrl}/desktop/img/cloud-blue.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default CockFightingBanner;
