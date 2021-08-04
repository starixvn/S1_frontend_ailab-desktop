import React from "react";
import PropTypes from "prop-types";

const LiveCasinoListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		menuType,
		lobbyImg
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(item => item.tpId === tpId);

	return (
		<div
			className={isInMaintain ? "active" : ""}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					menuType
				})
			}>
			<img
				lobbyImg
				src={require(`../../styles/img/livecasinolist-new/${lobbyImg}.jpg`)}
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
