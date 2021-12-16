import React from "react";
import LoadingImg from "../../styles/img/loading_star.png";

export default () => {
	return (
		<div className="loading">
			<div>
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
				<img src={LoadingImg} />
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
