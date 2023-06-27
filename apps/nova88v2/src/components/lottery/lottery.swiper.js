import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import Swiper from "react-id-swiper";
import { bannerImgUrl } from "../../config";

const LotterySwiper = ({
	t,
	lotterySubMenu,
	tpGameTypeSettingList,
	clickItem
}) => {
	const params = {
		slidesPerView: 5,
		spaceBetween: 5,
		centeredSlides: true,
		loop: true,
		autoplay: {
			delay: 3500,
			disableOnInteraction: false
		},
		rebuildOnUpdate: true,
		containerClass: "swiper-container lotterySwiper"
	};

	return (
		lotterySubMenu &&
		lotterySubMenu.length > 0 && (
			<Swiper {...params}>
				{lotterySubMenu.map(subMenuItem => {
					if (
						tpGameTypeSettingList &&
						tpGameTypeSettingList.length > 0
					) {
						tpGameTypeSettingList.forEach(settingItem => {
							if (
								settingItem.gameType ===
									subMenuItem.tpGameType &&
								settingItem.tpId === subMenuItem.tpId
							) {
								Object.assign(subMenuItem, settingItem);
							}
						});
					}
					if (subMenuItem?.noShow) return;
					return (
						<SlideItem
							key={`${subMenuItem.displayKey}-${subMenuItem.isInMaintain}`}
							t={t}
							subMenuItem={subMenuItem}
							clickItem={clickItem}
						/>
					);
				})}
			</Swiper>
		)
	);
};

LotterySwiper.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	lotterySubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default memo(LotterySwiper);

const SlideItem = ({ t, subMenuItem, clickItem }) => {
	const [isHover, setIsHover] = useState(false);

	const hoverHandler = () => setIsHover(prev => !prev);

	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		lobbyPage: { bgImg, hoverBgImg },
		tpGameType,
		isInMaintain,
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const _className = ["swiper-slide", isInMaintain && "active"]
		.filter(Boolean)
		.join(" ");

	const _style = {
		pointerEvents: isInMaintain ? "none" : "auto"
	};

	return (
		<div
			className={_className}
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
					tpGameType,
					noPlay
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			<div className="name">{_displayText}</div>

			{isHover ? (
				<img
					src={`${bannerImgUrl}/desktop/img/lottery/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/desktop/img/lottery/${bgImg}`}
					alt={bgImg}
				/>
			)}

			<div className="under">{t("lbl_underMaintenance")}</div>

			<div>{t("lbl_PlayNow")}</div>
		</div>
	);
};

SlideItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
