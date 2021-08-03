import React from "react";
import PropTypes from "prop-types";

import bannerEnImg from "../../styles/img/fishing/banner_en.jpg";
import bannerVnImg from "../../styles/img/fishing/banner_vn.jpg";
import sharkImg from "../../styles/img/fishing/shark.png";
import bubble1Img from "../../styles/img/fishing/bubble1.png";

const FishingBanner = ({ langId }) => {
	const imgUrl =
		{
			en: bannerEnImg,
			vn: bannerVnImg
		}[langId] || bannerEnImg;

	return (
		<div className="aniBanner">
			<img src={imgUrl} alt="fishing" />
			<div className="items">
				<img src={sharkImg} alt="sharkImg" />
				<img src={bubble1Img} alt="bubble1Img" />
				<img src={bubble1Img} alt="bubble1Img" />
			</div>
		</div>
	);
};

export default FishingBanner;

FishingBanner.propTypes = {
	langId: PropTypes.string.isRequired
};
