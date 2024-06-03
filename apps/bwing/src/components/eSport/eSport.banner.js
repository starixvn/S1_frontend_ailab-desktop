import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const ESportBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-esports-${langId}.jpg`}
				alt="esport-banner-img"
			/>
		</div>
	);
};

ESportBanner.defaultProps = {
	langId: "en"
};

ESportBanner.propTypes = {
	langId: PropTypes.string
};

export default ESportBanner;
