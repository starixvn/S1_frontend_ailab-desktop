import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

SwiperCore.use([Navigation]);

const TopQuickLink = ({
	lobbyImgList,
	activeProvider,
	onChange,
	langId,
	initialSlide,
	slidesPerViewNum
}) => {
	const { userInfo } = useContext(userInfoContext);
	const [hoverImg, setHoverImg] = useState(null);
	const handleOnMouseOverImg = imgName => {
		setHoverImg(`${imgName}`);
	};

	const dataRows =
		lobbyImgList.length > slidesPerViewNum
			? lobbyImgList
			: [...lobbyImgList, ...lobbyImgList];

	const Rows = dataRows.map((_item, idx) => {
		const _srcImg =
			hoverImg === _item.tpName || activeProvider.tpId === _item.tpId
				? `${_item.imgName}a`
				: _item.imgName;

		const content = (
			<Link
				to={
					_item?.openPath
						? `/${userInfo.langId}/${_item?.openPath}`
						: `/${userInfo.langId}/casino?tpId=${_item.tpId}&tpGameType=${_item.tpGameType}`
				}>
				<img
					src={`${bannerImgUrl}/desktop/img/venderlogo/${_srcImg}.png`}
					alt={_item.tpName}
				/>
				<div>{_item.displayText}</div>
			</Link>
		);

		return (
			// eslint-disable-next-line react/no-array-index-key
			<SwiperSlide key={`slot-swiper-${_item.tpId}-${idx}`}>
				<div className="swiper-slide">
					{_item.openPath ? (
						<Link
							className={
								activeProvider.tpId === _item.tpId
									? "active"
									: ""
							}
							to={`/${langId}/${_item.openPath}`}>
							{content}
						</Link>
					) : (
						<button
							onClick={() =>
								onChange(_item === activeProvider ? "" : _item)
							}
							className={
								activeProvider.tpId === _item.tpId
									? "active"
									: ""
							}
							onMouseOver={handleOnMouseOverImg.bind(
								this,
								_item.tpName
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
		slidesPerView: slidesPerViewNum,
		loop: true
	};

	return (
		<div className="partnerSelect">
			<Swiper
				key={initialSlide}
				initialSlide={initialSlide}
				navigation={true}
				{...params}>
				{Rows}
			</Swiper>
		</div>
	);
};

TopQuickLink.defaultProps = {
	langId: null,
	initialSlide: null,
	slidesPerViewNum: null
};

TopQuickLink.propTypes = {
	lobbyImgList: PropTypes.arrayOf(PropTypes.any).isRequired,
	activeProvider: PropTypes.objectOf(PropTypes.any).isRequired,
	onChange: PropTypes.func.isRequired,
	langId: PropTypes.string,
	initialSlide: PropTypes.number,
	slidesPerViewNum: PropTypes.number
};

export default TopQuickLink;
