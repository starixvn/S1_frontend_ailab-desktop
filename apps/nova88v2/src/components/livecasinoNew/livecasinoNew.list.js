import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

export default ({ listData, maintainList, clickItem, t }) => {
	return listData.map(subMenuItem => {
		if (!subMenuItem.lobbyPage) return null;

		return (
			<LiveCasinoListItem
				key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
				t={t}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
			/>
		);
	});
};

const LiveCasinoListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		menuType,
		lobbyPage: { npcImg },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList.some(
		item => item.tpId === tpId && item.tpGameType === tpGameType
	);

	const _className = [isInMaintain && "active"].filter(Boolean).join(" ");

	const _style = {
		pointerEvents: isInMaintain ? "none" : "auto"
	};

	return (
		<div
			className={_className}
			style={_style}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					path,
					needLogin,
					menuType,
					tpGameType
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			<div className="animationImg">
				<img
					src={`${bannerImgUrl}/img/livecasino/animation_img.png`}
					alt="animation-img"
				/>
			</div>
			<img
				src={`${bannerImgUrl}/img/livecasino/${npcImg}.png`}
				alt="casino-img"
			/>

			<div className="name">{_displayText}</div>
			<div className="under">{t("lbl_underMaintenance")}</div>
		</div>
	);
};

LiveCasinoListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
