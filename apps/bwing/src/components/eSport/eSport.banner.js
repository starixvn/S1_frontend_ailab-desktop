import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const EsportBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-esports-${langId}.jpg`}
				alt="esport-banner-img"
			/>
		</div>
	);
};

EsportBanner.defaultProps = {
	langId: "en"
};

EsportBanner.propTypes = {
	langId: PropTypes.string
};

export default EsportBanner;
