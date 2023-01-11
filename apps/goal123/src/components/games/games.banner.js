import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const BANNER_LIST = {
	en: `${bannerImgUrl}/desktop/img/new-games/new-banner-en.png`,
	vn: `${bannerImgUrl}/desktop/img/new-games/new-banner-vn.png`
};

const GamesBanner = ({ langId }) => {
	const _langId = Object.keys(BANNER_LIST).includes(langId) ? langId : "en";

	return (
		<div className="aniBanner">
			<img src={BANNER_LIST[_langId]} alt="games-banner-img" />

			<div className="items">
				<img
					src={`${bannerImgUrl}/desktop/img/new-games/dice.png`}
					alt=""
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/new-games/soccer-ball.png`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
