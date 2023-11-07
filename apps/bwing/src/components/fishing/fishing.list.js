import React from "react";
import PropTypes from "prop-types";
import FishingListItem from "./fishing.list.item";

const FishingList = ({ subMenu, clickItem, maintainList }) => {
	return (
		<>
			{subMenu.map(subMenuItem => {
				if (!subMenuItem.lobbyPage) return null;
				return (
					<FishingListItem
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

export default FishingList;

FishingList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
