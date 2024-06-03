import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const FishingListItem = ({ onclickFishingItem, subMenuItem }) => {
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

	const fishingLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<button
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickFishingItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{fishingLobbyIcon && <div className={fishingLobbyIcon} />}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
			<div className="name">
				{displayName || subMenuItem?.productName}
			</div>
		</button>
	);
};
export default FishingListItem;

FishingListItem.propTypes = {
	onclickFishingItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
