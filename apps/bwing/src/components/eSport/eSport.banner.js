import React from "react";
import { bannerImgUrl } from "../../config";

const EsportBanner = () => {
	return (
		<div className="lobbybanner">
			<img
				src={`${bannerImgUrl}/desktop/img/esportslobby/esportbanner.jpg`}
				alt="esportBanner-img"
			/>

			<div className="ball1">
				<img
					className="ballImg"
					alt="ballImg1"
					src={`${bannerImgUrl}/desktop/img/esportslobby/gem1.png`}
				/>
			</div>

			<div className="ball1 ball2">
				<img
					className="ballImg"
					alt="ballImg2"
					src={`${bannerImgUrl}/desktop/img/esportslobby/gem2.png`}
				/>
			</div>
		</div>
	);
};

export default EsportBanner;
