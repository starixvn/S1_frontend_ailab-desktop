import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";

const GameList = ({ t, subMenu, allMaintainList, clickItem }) => {
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
				key={subMenuItem.displayKey}
				t={t}
				isInMaintain={isInMaintain}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

GameList.propTypes = {
	t: PropTypes.func.isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default GameList;

const GameListItem = ({ subMenuItem, isInMaintain, clickItem, t }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgClass },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const _className = [bgClass, isInMaintain && "under"]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			className={_className}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					tpGameType,
					isInMaintain
				})
			}>
			{isInMaintain && (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			)}

			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={`icon ${subMenuItem.eventIcons[0]}`} />
			)}

			<p>{_displayText}</p>
		</div>
	);
};

GameListItem.propTypes = {
	t: PropTypes.func.isRequired,
	isInMaintain: PropTypes.bool.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
