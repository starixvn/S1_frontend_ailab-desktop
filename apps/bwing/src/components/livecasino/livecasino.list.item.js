import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defTpGameType } from "../../datas/productList";

const LiveCasinoListItem = ({ clickItem, subMenuItem, maintainList }) => {
	const { tpId, gameId, menuType, lobbyImg, tpGameType } = subMenuItem;
	const { t } = useTranslation();

	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	const _className = `lobby-products-items${isInMaintain ? " maintain" : ""}`;
	const baseLobbyUrl =
		"https://banner.bw88.io/desktop/img/4.0/lobby/livecasino";

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
					menuType,
					isInMaintain,
					tpGameType
				})
			}
		>
			{isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{showIcon && <div className={showIcon} />}
			<img src={`${baseLobbyUrl}/${lobbyImg}`} alt="" />
			{/* <div className="name">{_displayText}</div> */}
		</a>
	);
};

export default LiveCasinoListItem;

LiveCasinoListItem.propTypes = {
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
