import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { cloudImgUrl } from "../../config";

SwiperCore.use([Navigation]);

const TopQuickLink = ({
	lobbyImgList,
	clickLobbyProvider,
	activeProviderId,
	langId
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

		const content = (
			<>
				<img
					src={`${cloudImgUrl}/SiteSkin/img/logo/${_srcImg}.png`}
					alt={_item.lobbyImgName}
				/>
				<div>{_item.lobbyDisplayName}</div>
			</>
		);

		return (
			<SwiperSlide key={`slot-swiper-${_item.providerId}-${idx}`}>
				<div className="swiper-slide">
					{_item.path ? (
						<Link
							className={
								activeProviderId === _item.providerId
									? "active"
									: ""
							}
							to={`/${langId}/${_item.path}`}>
							{content}
						</Link>
					) : (
						<button
							onClick={clickLobbyProvider.bind(
								this,
								_item.providerId
							)}
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
							{content}
						</button>
					)}
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
			<Swiper navigation={true} {...params}>
				{Rows}
			</Swiper>
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
