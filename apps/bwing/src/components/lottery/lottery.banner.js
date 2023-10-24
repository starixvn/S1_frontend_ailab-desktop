import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LotteryBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-lottery-${langId}.jpg`}
				alt="lottery-banner-img"
			/>
		</div>
	);
};

LotteryBanner.defaultProps = {
	langId: "en"
};

LotteryBanner.propTypes = {
	langId: PropTypes.string
};

export default LotteryBanner;
