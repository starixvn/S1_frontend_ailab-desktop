import React from "react";
import { bannerImgUrl } from "../../config";

export default () => {
	return (
		<div className="loading">
			<img
				src={`${bannerImgUrl}/desktop/img/loading-img.png`}
				alt="loading1"
			/>
			<img
				src={`${bannerImgUrl}/desktop/img/loading-img1.png`}
				alt="loading2"
			/>
			<img
				src={`${bannerImgUrl}/desktop/img/loading-img2.png`}
				alt="loading3"
			/>
			<img
				src={`${bannerImgUrl}/desktop/img/loading-img3.png`}
				alt="loading4"
			/>
		</div>
	);
};

export const IconSpinner = ({ active }) => {
	if (!active) return null;

	return (
		<div className="otpLoading">
			<i className="icon icon-spinner11" />
		</div>
	);
};
