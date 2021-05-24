import React, { useState, useRef } from "react";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import config from "../../config";

const TopQuickLink = ({ lobbyImgList, clickLobbyProvider }) => {
	const [setSwiper] = useState(null);
	const ref = useRef(null);
	const [hoverImg, setHoverImg] = useState(null);

	const goNext = () => {
		if (ref.current !== null) {
			ref.current.slideNext();
		}
	};

	const goPrev = () => {
		if (ref.current !== null) {
			ref.current.slidePrev();
		}
	};

	const params = {
		slidesPerView: 9,
		centeredSlides: true,
		loopFillGroupWithBlank: true,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		getSwiper: obj => {
			ref.current = obj;
		},
		renderPrevButton: () => (
			<div className="swiper-button-prev" onClick={goPrev} />
		),
		renderNextButton: () => (
			<div className="swiper-button-next" onClick={goNext} />
		)
	};

	const handleOnMouseOverImg = imgName => {
		setHoverImg(`${imgName}`);
	};

	const Rows = lobbyImgList?.map(_item => {
		return (
			<div
				className="swiper-slide"
				onClick={clickLobbyProvider.bind(this, _item.providerId)}
				key={`slot_lobby_${_item.providerId}`}>
				<button
					onMouseOver={handleOnMouseOverImg.bind(
						this,
						_item.lobbyImgName
					)}
					onMouseOut={handleOnMouseOverImg.bind(this, "")}
					onBlur={() => 0}
					onFocus={() => 0}>
					<img
						src={`${config.cloudImgUrl}/SiteSkin/img/logo/${
							_item.lobbyImgName
						}${hoverImg === _item.lobbyImgName ? "a" : ""}.png`}
						alt={_item.lobbyImgName}
					/>
					<div>{_item.lobbyDisplayName}</div>
				</button>
			</div>
		);
	});

	return (
		<div className="partnerSelect">
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper {...params} getSwiper={setSwiper}>
					{Rows}
				</Swiper>
			</div>
		</div>
	);
};

TopQuickLink.propTypes = {
	lobbyImgList: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickLobbyProvider: PropTypes.func.isRequired
};

export default TopQuickLink;
