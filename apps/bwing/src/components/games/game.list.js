import React from "react";
import PropTypes from "prop-types";

const GameList = ({ t, subMenu, maintainList, defTpCategoryId, clickItem }) => {
	if (subMenu.length <= 0) return null;

	return subMenu.map(subMenuItem => {
		return (
			<GameListItem
				key={subMenuItem.displayKey}
				t={t}
				maintainList={maintainList}
				defTpCategoryId={defTpCategoryId}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

GameList.propTypes = {
	t: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default GameList;

const GameListItem = ({
	t,
	subMenuItem,
	clickItem,
	maintainList,
	defTpCategoryId
}) => {
	const {
		displayText,
		displayKey,
		tpId,
		tpCategory,
		gameId,
		lobbyPage: { bgClass }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		mt =>
			mt.tpId === tpId &&
			(mt.tpCategoryId === tpCategory ||
				mt.tpCategoryId === defTpCategoryId.all)
	);

	return (
		<div
			className={`${bgClass} ${isInMaintain ? "under" : ""}`}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					isInMaintain
				})
			}>
			{isInMaintain ? (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			) : null}

			<p>
				{_displayText} {isInMaintain ? "xxxxxxx" : ""}
			</p>
		</div>
	);
};

GameListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	defTpCategoryId: PropTypes.objectOf(PropTypes.any).isRequired
};
