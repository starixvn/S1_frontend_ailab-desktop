import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const CockFightingBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-cockfighting-${langId}.jpg`}
				alt="cockfighting-banner-img"
			/>
		</div>
	);
};

CockFightingBanner.defaultProps = {
	langId: "en"
};

CockFightingBanner.propTypes = {
	langId: PropTypes.string
};

export default CockFightingBanner;
