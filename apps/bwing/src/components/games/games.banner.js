import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const BANNER_LIST = {
	en: `${bannerImgUrl}/desktop/img/new-gameslobby/new-banner-en.png`,
	vn: `${bannerImgUrl}/desktop/img/new-gameslobby/new-banner-vn.png`
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
					src={`${bannerImgUrl}/desktop/img/new-gameslobby/newchip-1.png`}
				/>
			</div>

			<div className="ball1 ball2">
				<img
					className="ballImg"
					alt="ballImg2"
					src={`${bannerImgUrl}/desktop/img/new-gameslobby/newchip-2.png`}
				/>
			</div>

			<div className="ball3">
				<img
					className="ballImg"
					src={`${bannerImgUrl}/desktop/img/new-gameslobby/newdice.png`}
					alt="ballImg3"
				/>
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
