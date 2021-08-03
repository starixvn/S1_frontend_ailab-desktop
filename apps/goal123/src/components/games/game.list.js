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
		lobbyPage: { bgImg }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		mt =>
			mt.tpId === tpId &&
			(mt.tpCategoryId === tpCategory ||
				mt.tpCategoryId === defTpCategoryId.all)
	);

	return (
		<div className={isInMaintain ? "active" : ""}>
			<img src={bgImg} alt="game-item-img" />

			<div className="txt-darkBlue">{_displayText}</div>

			<div className="mask">
				<button
					className="blue"
					onClick={() =>
						clickItem({
							tpId,
							gameId,
							isInMaintain
						})
					}>
					{t("lbl_Play")}
				</button>
				{/* <button className="blue">{t("lbl_Demo")}</button> */}
			</div>

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
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	defTpCategoryId: PropTypes.objectOf(PropTypes.any).isRequired
};
