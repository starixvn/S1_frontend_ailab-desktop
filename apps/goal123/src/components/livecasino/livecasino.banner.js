import React from "react";
import PropTypes from "prop-types";

import bannerEnImg from "../../styles/img/livecasinolist/banner_en.jpg";
import bannerVnImg from "../../styles/img/livecasinolist/banner_vn.jpg";
import chip1Img from "../../styles/img/livecasinolist/chip1.png";
import chip2Img from "../../styles/img/livecasinolist/chip2.png";
import diceImg from "../../styles/img/livecasinolist/dice.png";

const LiveCasinoBanner = ({ langId }) => {
	const imgUrl =
		{
			en: bannerEnImg,
			vn: bannerVnImg
		}[langId] || bannerEnImg;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="livecasino" />
			<div className="items">
				<img src={chip1Img} alt="chip1Img" />
				<img src={chip2Img} alt="chip2Img" />
				<img src={diceImg} alt="diceImg" />
			</div>
		</div>
	);
};

export default LiveCasinoBanner;

LiveCasinoBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
