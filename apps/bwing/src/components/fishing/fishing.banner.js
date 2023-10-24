import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const FishingBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-fishing-${langId}.jpg`}
				alt="fishing-banner-img"
			/>
		</div>
	);
};

FishingBanner.defaultProps = {
	langId: "en"
};

FishingBanner.propTypes = {
	langId: PropTypes.string
};

export default FishingBanner;
