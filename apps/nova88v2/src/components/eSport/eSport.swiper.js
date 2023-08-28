import React, { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { bannerImgUrl } from "../../config";

const EsportSwiper = ({ t, subMenu, tpGameTypeSettingList, clickItem }) => {
	const params = {
		slidesPerView: 5,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false
		},
		rebuildOnUpdate: false,
		containerClass: "swiper-container lotterySwiper"
	};

	useEffect(() => {
		const canUseDom = () =>
			Boolean(typeof window !== "undefined" && window.document);

		if (canUseDom) {
			const slides = document.querySelectorAll(".swiper-slide-duplicate");
			let index = null;

			slides.forEach(el => {
				index = el.getAttribute("data-swiper-slide-index");

				const {
					tpId,
					gameId,
					path,
					needLogin,
					lobbyPage: { bgImg, hoverBgImg },
					isInMaintain,
					betType
				} = subMenu[index];

				el.addEventListener("mouseover", e => {
					e.target.src = `${bannerImgUrl}/desktop/img/esport/${hoverBgImg}`;
				});

				el.addEventListener("mouseout", e => {
					e.target.src = `${bannerImgUrl}/desktop/img/esport/${bgImg}`;
				});

				el.addEventListener("click", () =>
					clickItem({
						tpId,
						gameId,
						path,
						needLogin,
						isInMaintain,
						betType
					})
				);
			});
		}
	}, []);

	return (
		subMenu &&
		subMenu.length > 0 &&
		// <Swiper {...params}>
		subMenu.map(subMenuItem => {
			if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
				tpGameTypeSettingList.forEach(settingItem => {
					if (
						settingItem.gameType === subMenuItem.tpGameType &&
						settingItem.tpId === subMenuItem.tpId
					) {
						Object.assign(subMenuItem, settingItem);
					}
				});
			}
			if (subMenuItem?.noShow) return null;
			return (
				<SlideItem
					key={`${subMenuItem.displayKey}-${subMenuItem.isInMaintain}`}
					t={t}
					subMenuItem={subMenuItem}
					clickItem={clickItem}
				/>
			);
		})
		// </Swiper>
	);
};

EsportSwiper.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default memo(EsportSwiper);

const SlideItem = ({ t, subMenuItem, clickItem }) => {
	const [isHover, setIsHover] = useState(false);

	const hoverHandler = () => setIsHover(prev => !prev);

	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		tpGameType,
		path,
		needLogin,
		lobbyPage: { bgImg, hoverBgImg },
		isInMaintain,
		betType,
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	// const _className = ["swiper-slide", isInMaintain && "active"]
	// 	.filter(Boolean)
	// 	.join(" ");

	const _style = {
		pointerEvents: isInMaintain ? "none" : "auto"
	};

	return (
		<div
			className={`esport-item ${isInMaintain ? " active" : ""}`}
			style={_style}
			onMouseOver={hoverHandler}
			onMouseOut={hoverHandler}
			onFocus={() => 0}
			onBlur={() => 0}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					path,
					needLogin,
					isInMaintain,
					betType,
					noPlay,
					tpGameType
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			<div className="esport-name">{_displayText}</div>

			{isHover ? (
				<img
					src={`${bannerImgUrl}/desktop/img/esport/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/desktop/img/esport/${bgImg}`}
					alt={bgImg}
				/>
			)}

			<div className="under">{t("lbl_underMaintenance")}</div>
		</div>
	);
};

SlideItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
