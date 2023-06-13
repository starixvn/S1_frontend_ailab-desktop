import React from "react";
import PropTypes from "prop-types";
import FishingListItem from "./fishing.list.item";

const FishingList = ({ subMenu, maintainList, clickItem, t }) => {
	return (
		<div className="fishingList">
			{subMenu.map(subMenuItem => {
				if (!subMenuItem.lobbyPage) return null;

				return (
					<FishingListItem
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						t={t}
						clickItem={clickItem}
						subMenuItem={subMenuItem}
						maintainList={maintainList}
					/>
				);
			})}
		</div>
	);
};

export default FishingList;

FishingList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
