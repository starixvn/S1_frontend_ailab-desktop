import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const LiveCasinoListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		menuType,
		lobbyImg,
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	return (
		<div
			className={isInMaintain ? "active" : ""}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					menuType,
					tpGameType,
					isInMaintain
				})
			}>
			<img
				lobbyImg
				src={`${bannerImgUrl}/desktop/img/livecasinolist/${lobbyImg}.jpg`}
				alt={`${_displayText}-bgimg`}
			/>
			{isInMaintain ? (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			) : null}
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={`icon ${subMenuItem.eventIcons[0]}`} />
			)}
		</div>
	);
};

export default LiveCasinoListItem;

LiveCasinoListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
