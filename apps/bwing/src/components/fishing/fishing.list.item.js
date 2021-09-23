import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";

const FishingListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgClass },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === subMenuItem.tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	return (
		<div
			className={`${bgClass} ${isInMaintain ? " under" : ""}`}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					isInMaintain,
					tpGameType
				})
			}>
			{isInMaintain ? (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			) : null}
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			<p>{_displayText}</p>
		</div>
	);
};
export default FishingListItem;

FishingListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
