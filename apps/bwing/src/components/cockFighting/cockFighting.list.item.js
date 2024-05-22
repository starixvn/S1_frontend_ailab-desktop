import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const CockFightingListItem = ({ clickItem, subMenuItem, maintainList }) => {
	const { t } = useTranslation();
	const { displayText, displayKey, tpId, gameId, tpGameType, lobbyImg } =
		subMenuItem;
	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === subMenuItem.tpGameType ||
				item.tpGameType === defTpGameType.All)
	);
	const _className = `lobby-products-items${isInMaintain ? " maintain" : ""}`;
	const baseLobbyUrl = `${bannerImgUrl}/desktop/img/4.0/lobby/cockfighting`;

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
					tpGameType,
					isInMaintain
				})
			}
		>
			{isInMaintain && (
				<div className="tag-maintain">{t("lbl_underMaintenance")}</div>
			)}
			{showIcon && <div className={showIcon} />}

			<img src={`${baseLobbyUrl}/${lobbyImg}`} alt={_displayText} />
			<div className="name">{_displayText}</div>
		</a>
	);
};
export default CockFightingListItem;

CockFightingListItem.propTypes = {
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
