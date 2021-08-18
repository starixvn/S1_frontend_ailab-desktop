import React, { useState } from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const GameList = ({
	t,
	gameSubMenu,
	maintainList,
	defTpCategoryId,
	clickItem
}) => {
	if (gameSubMenu.length <= 0) return null;

	return gameSubMenu.map(subMenuItem => (
		<GameListItem
			key={subMenuItem.tpId}
			t={t}
			subMenuItem={subMenuItem}
			maintainList={maintainList}
			defTpCategoryId={defTpCategoryId}
			clickItem={clickItem}
		/>
	));
};

GameList.propTypes = {
	t: PropTypes.func.isRequired,
	gameSubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default GameList;

const GameListItem = ({
	t,
	clickItem,
	subMenuItem,
	maintainList,
	defTpCategoryId
}) => {
	const [isHover, setIsHover] = useState(false);

	const hoverHandler = () => setIsHover(prev => !prev);

	const {
		displayText,
		displayKey,
		tpId,
		tpCategory,
		gameId,
		path,
		needLogin,
		lobbyPage: { bgImg, hoverBgImg }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isInMaintain = maintainList?.some(
		mt =>
			mt.tpId === tpId &&
			(mt.tpCategoryId === tpCategory ||
				mt.tpCategoryId === defTpCategoryId.all)
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
					isInMaintain
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			{isHover ? (
				<img
					src={`${bannerImgUrl}/img/game/${hoverBgImg}`}
					alt={hoverBgImg}
				/>
			) : (
				<img
					src={`${bannerImgUrl}/img/game/${bgImg}`}
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
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	defTpCategoryId: PropTypes.objectOf(PropTypes.any).isRequired
};
