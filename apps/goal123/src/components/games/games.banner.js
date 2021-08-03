import React from "react";
import PropTypes from "prop-types";

import bannerEnImg from "../../styles/img/games/banner_en.jpg";
import bannerVnImg from "../../styles/img/games/banner_vn.jpg";
import ball1Img from "../../styles/img/games/ball1.png";
import ball2Img from "../../styles/img/games/ball2.png";

const GamesBanner = ({ langId }) => {
	const imgUrl =
		{
			en: bannerEnImg,
			vn: bannerVnImg
		}[langId] || bannerEnImg;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="games" />
			<div className="items">
				<img src={ball1Img} alt="ball1Img" />
				<img src={ball2Img} alt="ball2Img" />
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
