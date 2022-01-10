import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const GamesBanner = ({ langId }) => {
	const imgUrl =
		{
			en: `${bannerImgUrl}/desktop/img/games/banner_en.jpg`,
			vn: `${bannerImgUrl}/desktop/img/games/banner_vn.jpg`
		}[langId] || `${bannerImgUrl}/desktop/img/games/banner_en.jpg`;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="games" />
			<div className="items">
				<img
					src={`${bannerImgUrl}/desktop/img/games/ball1.png`}
					alt="ball1Img"
				/>
				<img
					src={`${bannerImgUrl}/desktop/img/games/ball2.png`}
					alt="ball2Img"
				/>
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
