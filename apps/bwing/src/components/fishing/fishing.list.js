import React from "react";
import PropTypes from "prop-types";
import FishingListItem from "./fishing.list.item";

const FishingList = ({ fishingSubMenus = [], onclickFishingItem }) => {
	if (fishingSubMenus.length === 0) return null;

	return (
		<>
			{fishingSubMenus.map(subMenuItem => {
				return (
					<FishingListItem
						key={subMenuItem?.tpGameIdNo}
						onclickFishingItem={onclickFishingItem}
						subMenuItem={subMenuItem}
					/>
				);
			})}
		</>
	);
};

export default FishingList;

FishingList.propTypes = {
	fishingSubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickFishingItem: PropTypes.func.isRequired
};
