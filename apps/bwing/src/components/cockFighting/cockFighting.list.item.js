import classNames from "classnames";
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const CockFightingListItem = ({ onclickCockFightingItem, subMenuItem }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const displayName =
		userInfo?.langId &&
		subMenuItem?.currencyGameName !== null &&
		typeof subMenuItem?.currencyGameName === "object" &&
		subMenuItem?.currencyGameName[userInfo?.langId];

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

	const cockFightingLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<button
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickCockFightingItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{cockFightingLobbyIcon && <div className={cockFightingLobbyIcon} />}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
			<div className="name">
				{displayName || subMenuItem?.productName}
			</div>
		</button>
	);
};
export default CockFightingListItem;

CockFightingListItem.propTypes = {
	onclickCockFightingItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
