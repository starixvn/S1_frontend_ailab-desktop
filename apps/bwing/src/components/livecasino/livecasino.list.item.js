import React from "react";
import PropTypes from "prop-types";

const LiveCasinoListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		tpId,
		gameId,
		menuType,
		lobbyPage: { bgClass }
	} = subMenuItem;

	const isInMaintain = maintainList.some(item => item.tpId === tpId);

	return (
		<div
			className={`${bgClass} ${isInMaintain ? " under" : ""}`}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					menuType,
					isInMaintain
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<i className={`icon  ${subMenuItem.eventIcons[0]}`} />
			)}
			{isInMaintain ? (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			) : null}
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
