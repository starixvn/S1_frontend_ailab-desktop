import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LiveCasinoBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-casino-${langId}.jpg`}
				alt="casino-banner-img"
			/>
		</div>
	);
};

LiveCasinoBanner.defaultProps = {
	langId: "en"
};

LiveCasinoBanner.propTypes = {
	langId: PropTypes.string
};

export default LiveCasinoBanner;
