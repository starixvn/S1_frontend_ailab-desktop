import React from "react";

export default () => {
	return (
		<div className="loading">
			<div>
				<span />
				<span />
				<span />
				<span />
				<span />
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
