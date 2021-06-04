/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import config from "../../config";

const FishingBanner = ({ slideImgList }) => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		}
	};

	return (
		<Swiper {...params}>
			{slideImgList.map(img => (
				<div className="swiper-slide" key={`slide-key-${img}`}>
					<img
						src={`${config.bannerImgUrl}/img/fishing/${img}`}
						alt="fishmainbanner"
					/>
				</div>
			))}
		</Swiper>
	);
};

export default FishingBanner;

FishingBanner.propTypes = {
	slideImgList: PropTypes.arrayOf(PropTypes.string).isRequired
};
