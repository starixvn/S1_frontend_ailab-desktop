/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { bannerImgUrl } from "../../config";

const LiveCasinoBanner = ({ slideImgList }) => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		}
	};

	return (
		<Swiper {...params}>
			{slideImgList.map(img => (
				<SwiperSlide key={`livacasino-slide-key-${img}`}>
					<img
						src={`${bannerImgUrl}/img/livecasino/${img}`}
						alt={img}
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default LiveCasinoBanner;

LiveCasinoBanner.propTypes = {
	slideImgList: PropTypes.arrayOf(PropTypes.string).isRequired
};
