import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defTpGameType } from "../../datas/productList";

const GameList = ({ subMenu, allMaintainList, clickItem }) => {
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
				isInMaintain={isInMaintain}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

GameList.propTypes = {
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default GameList;

const GameListItem = ({ subMenuItem, isInMaintain, clickItem }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		// lobbyPage: { bgClass },
		tpGameType,
		lobbyImg
	} = subMenuItem;
	const { t } = useTranslation();
	const _displayText = displayText || t(displayKey);
	const _className = `lobby-products-items${isInMaintain ? " maintain" : ""}`;
	const baseLobbyUrl = "https://banner.bw88.io/desktop/img/4.0/lobby/games";

	let _iconClassName = "";
	if (subMenuItem.eventIcons) {
		let iconStrings = "";
		for (let i = 0; i < subMenuItem.eventIcons.length; i++) {
			if (subMenuItem.eventIcons[i] !== "") {
				iconStrings += `${subMenuItem.eventIcons[i]}`;
			}
		}
		_iconClassName = `${iconStrings}`;
	}

	let showIcon = null;
	if (_iconClassName.length > 0) {
		if (_iconClassName === "tag-new") {
			showIcon = "tag-new-pop";
		} else {
			showIcon = _iconClassName;
		}
	}

	return (
		<a
			className={_className}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					tpGameType,
					isInMaintain
				})
			}
		>
			{isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{showIcon && <div className={showIcon} />}

			<img src={`${baseLobbyUrl}/${lobbyImg}`} alt={_displayText} />
			<div className="name">{_displayText}</div>
		</a>
	);
};

GameListItem.propTypes = {
	isInMaintain: PropTypes.bool.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
