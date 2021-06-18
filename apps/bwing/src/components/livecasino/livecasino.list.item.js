import React from "react";
import PropTypes from "prop-types";

const LiveCasinoListItem = ({ clickItem, subMenuItem }) => {
	const {
		tpId,
		gameId,
		menuType,
		lobbyPage: { bgClass }
	} = subMenuItem;

	return (
		<div
			className={bgClass}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					menuType
				})
			}>
			{subMenuItem?.eventIcons?.length > 0 && (
				<i className={`icon  ${subMenuItem.eventIcons[0]}`} />
			)}
		</div>
	);
};

export default LiveCasinoListItem;

LiveCasinoListItem.propTypes = {
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
