import React from "react";
import PropTypes from "prop-types";
import CockFightingListItem from "./cockFighting.list.item";

const CockFightingList = ({ subMenu, clickItem, maintainList }) => {
	return (
		<>
			{subMenu.map(subMenuItem => {
				if (!subMenuItem.lobbyPage) return null;
				return (
					<CockFightingListItem
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						clickItem={clickItem}
						subMenuItem={subMenuItem}
						maintainList={maintainList}
					/>
				);
			})}
		</>
	);
};

export default CockFightingList;

CockFightingList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
