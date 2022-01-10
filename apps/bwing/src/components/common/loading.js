import React from "react";
import { bannerImgUrl } from "../../config";

export default () => {
	return (
		<div className="loading">
			<div>
				<img
					src={`${bannerImgUrl}/desktop/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/loading_star.png`}
					alt="loading"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/loading_star.png`}
					alt="loading"
				/>
			</div>
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
