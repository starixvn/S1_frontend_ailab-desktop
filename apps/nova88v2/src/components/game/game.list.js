import React, { useState } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";
import { defTpGameType } from "../../datas/productList";

const GameList = ({
	t,
	gameSubMenu,
	maintainList,
	tpGameTypeSettingList,
	clickItem
}) => {
	if (gameSubMenu.length <= 0) return null;

	return gameSubMenu.map(subMenuItem => {
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
		if (subMenuItem?.noShow) return;
		return (
			<GameListItem
				key={`${subMenuItem.tpGameType}-${subMenuItem.gameId}`}
				t={t}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
				clickItem={clickItem}
			/>
		);
	});
};

GameList.propTypes = {
	t: PropTypes.func.isRequired,
	gameSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default GameList;

const GameListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
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
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		mt =>
			mt.tpId === tpId &&
			(mt.tpGameType === tpGameType ||
				mt.tpGameType === defTpGameType.All)
	);

	const _className = ["gameItem", isInMaintain && "active"]
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

			{isHover ? (
				<img
					src={`${bannerImgUrl}/desktop/img/game/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/desktop/img/game/${bgImg}`}
					alt={hoverBgImg}
				/>
			)}

			<div className="name">{_displayText}</div>

			<div className="under">{t("lbl_underMaintenance")}</div>
		</div>
	);
};

GameListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
