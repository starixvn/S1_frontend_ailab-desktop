import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const BANNER_LIST = {
	en: `${bannerImgUrl}/desktop/img/gameslobby/lotterybanner-en.jpg`,
	vn: `${bannerImgUrl}/desktop/img/gameslobby/lotterybanner-vn.jpg`
};

const GamesBanner = ({ langId }) => {
	const _langId = Object.keys(BANNER_LIST).includes(langId) ? langId : "en";

	return (
		<div className="lobbybanner">
			<img src={BANNER_LIST[_langId]} alt="games-banner-img" />

			<div className="ball1">
				<img
					className="ballImg"
					alt="ballImg1"
					src={`${bannerImgUrl}/desktop/img/gameslobby/ball1.png`}
				/>
			</div>

			<div className="ball1 ball2">
				<img
					className="ballImg"
					alt="ballImg2"
					src={`${bannerImgUrl}/desktop/img/gameslobby/ball2.png`}
				/>
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
