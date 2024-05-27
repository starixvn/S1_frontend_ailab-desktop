import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import classNames from "classnames";
import { userInfoContext } from "../common/context";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const GameList = ({ gameSubMenus, onclickGameItem }) => {
	if (gameSubMenus.length === 0) return null;

	return gameSubMenus.map(subMenuItem => {
		return (
			<GameListItem
				key={subMenuItem?.tpGameIdNo}
				onclickGameItem={onclickGameItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

GameList.propTypes = {
	gameSubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickGameItem: PropTypes.func.isRequired
};

export default GameList;

const GameListItem = ({ subMenuItem, onclickGameItem }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[userInfo?.langId] &&
		subMenuItem?.currencyGameName[userInfo?.langId];

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

	const gameLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<button
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickGameItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{gameLobbyIcon && <div className={gameLobbyIcon} />}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
			<div className="name">
				{displayName || subMenuItem?.productName}
			</div>
		</button>
	);
};

GameListItem.propTypes = {
	onclickGameItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
