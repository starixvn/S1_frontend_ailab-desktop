import React from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";

const VipSwipper = ({ banner }) => {
	const params = {
		spaceBetween: 30,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		rebuildOnUpdate: true,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	return (
		<div className="swiper-container">
			<div className="swiper-wrapper">
				<Swiper {...params}>
					{banner.map(item => (
						<div className="swiper-slide" key={item.alt}>
							<img
								src={item.url}
								className="banner"
								alt={item.alt ?? ""}
							/>
						</div>
					))}
				</Swiper>
			</div>
		</div>
	);
};

VipSwipper.propTypes = {
	banner: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VipSwipper;
