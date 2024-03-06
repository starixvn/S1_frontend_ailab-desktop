import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";

const CockFightingList = ({ t, subMenu, allMaintainList, clickItem }) => {
	if (subMenu.length <= 0) return null;

	return subMenu.map(subMenuItem => {
		const isInMaintain = allMaintainList?.some(
			item =>
				item.tpId === subMenuItem.tpId &&
				(item.tpGameType === subMenuItem.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		return (
			<GameListItem
				key={subMenuItem.tpGameType}
				t={t}
				isInMaintain={isInMaintain}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

CockFightingList.propTypes = {
	t: PropTypes.func.isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default CockFightingList;

const GameListItem = ({ subMenuItem, clickItem, isInMaintain, t }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgImg, hoverImg },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	return (
		<div
			className={isInMaintain ? "active" : ""}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					isInMaintain,
					tpGameType
				})
			}
		>
			<img className="gamesitem" src={bgImg} alt="game-item-img" />
			<img className="gameshover" src={hoverImg} alt="game-hover-img" />

			<div className="txt-darkBlue">{_displayText}</div>

			{isInMaintain && (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			)}

			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={`icon ${subMenuItem.eventIcons[0]}`} />
			)}
		</div>
	);
};

GameListItem.propTypes = {
	t: PropTypes.func.isRequired,
	isInMaintain: PropTypes.bool.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
