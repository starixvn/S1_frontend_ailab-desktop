import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { isShowEventIcon, switchLobbyIcon } from "../layout/header.menu.newDef";

const LiveCasinoListItem = ({ onclickCasinoItem, subMenuItem }) => {
	const { t } = useTranslation();

	// * 後端這裡是字串格式 需做處理
	const suBMenuLobbyImage =
		subMenuItem?.pcLobbyPicUrl && JSON.parse(subMenuItem?.pcLobbyPicUrl)[0];

	const { iconType, iconStartTime, iconEndTime } = subMenuItem || {};

	const liveCasinoLobbyIcon =
		isShowEventIcon(iconStartTime, iconEndTime) &&
		switchLobbyIcon(iconType);

	return (
		<a
			className={classNames("lobby-products-items", {
				maintain: subMenuItem?.isInMaintain
			})}
			onClick={() => onclickCasinoItem(subMenuItem)}>
			{subMenuItem?.isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{liveCasinoLobbyIcon && <div className={liveCasinoLobbyIcon} />}

			<img src={suBMenuLobbyImage} alt={subMenuItem?.productName} />
		</a>
	);
};

export default LiveCasinoListItem;

LiveCasinoListItem.propTypes = {
	onclickCasinoItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
