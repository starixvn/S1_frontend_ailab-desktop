import React from "react";
import { bannerImgUrl } from "../../config";

const EsportBanner = () => {
	return (
		<div className="aniBanner">
			<img
				src={`${bannerImgUrl}/desktop/img/esports/banner.jpg`}
				alt="esportBanner-img"
			/>

			<div className="items">
				<img
					src={`${bannerImgUrl}/desktop/img/esports/item.png`}
					alt=""
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/esports/title.png`}
					alt=""
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/esports/glow.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default EsportBanner;
