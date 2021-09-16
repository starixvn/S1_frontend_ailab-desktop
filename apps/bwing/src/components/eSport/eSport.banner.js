import React from "react";
import PropTypes from "prop-types";

import BannerImg from "../../styles/img/esportslobby/esportBanner.jpg";
import ball1Img from "../../styles/img/esportslobby/gem1.png";
import ball2Img from "../../styles/img/esportslobby/gem2.png";

const EsportBanner = () => {
	return (
		<div className="lobbybanner">
			<img src={BannerImg} alt="esportBanner-img" />

			<div className="ball1">
				<img className="ballImg" alt="ballImg1" src={ball1Img} />
			</div>

			<div className="ball1 ball2">
				<img className="ballImg" alt="ballImg2" src={ball2Img} />
			</div>
		</div>
	);
};

export default EsportBanner;
