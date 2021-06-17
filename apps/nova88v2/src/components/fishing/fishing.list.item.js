import React, { useState } from "react";
import PropTypes from "prop-types";
import config from "../../config";

const FishingListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const [isHover, setIsHover] = useState(false);

	const hoverHandler = () => setIsHover(prev => !prev);

	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		lobbyPage: { bgImg, hoverBgImg }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList.some(
		item => item.tpId === subMenuItem.tpId
	);

	const _className = [isInMaintain && "active"].filter(Boolean).join(" ");

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
			onBlur={() => 0}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			{isHover ? (
				<img
					src={`${config.bannerImgUrl}/img/fishing/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${config.bannerImgUrl}/img/fishing/${bgImg}`}
					alt={hoverBgImg}
				/>
			)}

			<div className="name">{_displayText}</div>

			<div className="btnGroup">
				<button
					onClick={() =>
						clickItem({
							tpId,
							gameId,
							path,
							needLogin
						})
					}>
					{t("lbl_Play")}
				</button>

				{/* <button>{t("lbl_Demo")}</button> */}
			</div>

			<div className="under">{t("lbl_underMaintenance")}</div>
		</div>
	);
};
export default FishingListItem;

FishingListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
