import PropTypes from "prop-types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const LobbyListItem = ({ subMenuItem, onClickProductItem }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const displayName =
		subMenuItem?.currencyGameName &&
		subMenuItem?.currencyGameName[userInfo?.langId] &&
		subMenuItem?.currencyGameName[userInfo?.langId];

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime, productName, isInMaintain } =
		subMenuItem || {};

	const gameLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<div className={isInMaintain ? "lobby-item under" : "lobby-item"}>
			<div className="lobby-item-img">
				{gameLobbyIcon}
				<img src={suBMenuLobbyImage} alt={productName} />
				<div className="play-btn">
					<button
						className="now"
						onClick={() => onClickProductItem(subMenuItem)}>
						{t("lbl_PlayNow")}
					</button>
				</div>
			</div>
			<div className="lobby-item-text">{displayName || productName}</div>
			{isInMaintain && (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			)}
		</div>
	);
};
export default LobbyListItem;

LobbyListItem.propTypes = {
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	onClickProductItem: PropTypes.func.isRequired
};
