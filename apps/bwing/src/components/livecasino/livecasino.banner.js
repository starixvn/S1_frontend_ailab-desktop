/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";

import bannerEnImg from "../../styles/img/livelobby/livelobby-banner-en.jpg";
import bannerVnImg from "../../styles/img/livelobby/livelobby-banner-vn.jpg";

import money1Img from "../../styles/img/livelobby/money1.png";
import money2Img from "../../styles/img/livelobby/money2.png";

const LiveCasinoBanner = ({ langId }) => {
	const imgUrl =
		{
			en: bannerEnImg,
			vn: bannerVnImg
		}[langId] || bannerEnImg;

	return (
		<div className="lobbybanner">
			<img src={imgUrl} alt="livecasino-banner" />
			<div className="ball1">
				<img className="ballImg" src={money1Img} alt="money1Img" />
			</div>
			<div className="ball1 ball2">
				<img className="ballImg" src={money2Img} alt="money2Img" />
			</div>
		</div>
	);
};

export default LiveCasinoBanner;

LiveCasinoBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
