import React from "react";
import PropTypes from "prop-types";
import CockFightingListItem from "./cockFighting.list.item";

const CockFightingList = ({
	cockFightingSubMenus = [],
	onclickCockFightingItem
}) => {
	if (cockFightingSubMenus.length === 0) return null;
	return (
		<>
			{cockFightingSubMenus.map(subMenuItem => {
				return (
					<CockFightingListItem
						key={subMenuItem?.tpGameIdNo}
						onclickCockFightingItem={onclickCockFightingItem}
						subMenuItem={subMenuItem}
					/>
				);
			})}
		</>
	);
};

export default CockFightingList;

CockFightingList.propTypes = {
	cockFightingSubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickCockFightingItem: PropTypes.func.isRequired
};
