import React, { useState } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";

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
		lobbyPage: { bgImg, hoverBgImg },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
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
			onBlur={() => 0}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					path,
					needLogin,
					tpGameType
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			{isHover ? (
				<img
					src={`${bannerImgUrl}/img/fishing/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/img/fishing/${bgImg}`}
					alt={hoverBgImg}
				/>
			)}

			<div className="name">{_displayText}</div>
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
