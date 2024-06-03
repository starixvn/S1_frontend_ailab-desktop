import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const ESportListItem = ({ subMenuItem, onclickESportItem }) => {
	const { t } = useTranslation();

	// * 後端這裡是字串格式 需做處理
	const subMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

	const eSportLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);
	return (
		<button
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickESportItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}

			{eSportLobbyIcon && <div className={eSportLobbyIcon} />}

			<img src={subMenuLobbyImage} alt={subMenuItem?.productName} />
		</button>
	);
};

ESportListItem.propTypes = {
	onclickESportItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};

export default ESportListItem;
