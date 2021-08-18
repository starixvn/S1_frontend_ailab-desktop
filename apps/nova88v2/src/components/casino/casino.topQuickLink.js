import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import { cloudImgUrl } from "../../config";

const TopQuickLink = ({
	lobbyImgList,
	clickLobbyProvider,
	activeProviderId
}) => {
	const [hoverImg, setHoverImg] = useState(null);
	const handleOnMouseOverImg = imgName => {
		setHoverImg(`${imgName}`);
	};

	const _slidesPerViewNum = 9;
	const dataRows =
		lobbyImgList.length > _slidesPerViewNum
			? lobbyImgList
			: [...lobbyImgList, ...lobbyImgList];

	const Rows = dataRows.map((_item, idx) => {
		const _srcImg =
			hoverImg === _item.lobbyImgName ||
			activeProviderId === _item.providerId
				? `${_item.lobbyImgName}a`
				: _item.lobbyImgName;

		return (
			<SwiperSlide key={`slot-swiper-${_item.providerId}-${idx}`}>
				<div
					className="swiper-slide"
					onClick={clickLobbyProvider.bind(this, _item.providerId)}>
					<button
						className={
							activeProviderId === _item.providerId
								? "active"
								: ""
						}
						onMouseOver={handleOnMouseOverImg.bind(
							this,
							_item.lobbyImgName
						)}
						onMouseOut={handleOnMouseOverImg.bind(this, "")}
						onBlur={() => 0}
						onFocus={() => 0}>
						<img
							src={`${cloudImgUrl}/SiteSkin/img/logo/${_srcImg}.png`}
							alt={_item.lobbyImgName}
						/>
						<div>{_item.lobbyDisplayName}</div>
					</button>
				</div>
			</SwiperSlide>
		);
	});

	const params = {
		spaceBetween: 0,
		slidesPerView: _slidesPerViewNum,
		loop: true
	};

	return (
		<div className="partnerSelect">
			<div className="swiper-wrapper">
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<Swiper navigation {...params}>
					{Rows}
				</Swiper>
			</div>
		</div>
	);
};

TopQuickLink.defaultProps = {
	activeProviderId: null
};

TopQuickLink.propTypes = {
	lobbyImgList: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickLobbyProvider: PropTypes.func.isRequired,
	activeProviderId: PropTypes.number
};

export default TopQuickLink;
