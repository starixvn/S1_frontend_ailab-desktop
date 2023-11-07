import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const GamesBanner = ({ langId }) => {
	return (
		<div className="lobby-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-banner-games-${langId}.jpg`}
				alt="games-banner-img"
			/>
		</div>
	);
};
GamesBanner.defaultProps = {
	langId: "en"
};

GamesBanner.propTypes = {
	langId: PropTypes.string
};

export default GamesBanner;
