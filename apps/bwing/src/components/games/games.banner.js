import React from "react";
import PropTypes from "prop-types";

import lotteryBanneyEnImg from "../../styles/img/gameslobby/lotterybanner-en.jpg";
import lotteryBanneyVnImg from "../../styles/img/gameslobby/lotteryBanner-vn.jpg";

import ball1Img from "../../styles/img/gameslobby/ball1.png";
import ball2Img from "../../styles/img/gameslobby/ball2.png";

const BANNER_LIST = {
	en: lotteryBanneyEnImg,
	vn: lotteryBanneyVnImg
};

const GamesBanner = ({ langId }) => {
	const _langId = Object.keys(BANNER_LIST).includes(langId) ? langId : "en";

	return (
		<div className="lobbybanner">
			<img src={BANNER_LIST[_langId]} alt="games-banner-img" />

			<div className="ball1">
				<img className="ballImg" alt="ballImg1" src={ball1Img} />
			</div>

			<div className="ball1 ball2">
				<img className="ballImg" alt="ballImg2" src={ball2Img} />
			</div>
		</div>
	);
};

export default GamesBanner;

GamesBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
