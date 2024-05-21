import React from "react";
import PropTypes from "prop-types";
import LiveCasinoListItem from "./livecasino.list.item";

const LiveCasinoList = ({ casinoSubMenus = [], onclickCasinoItem }) => {
	if (casinoSubMenus?.length === 0) return null;

	return (
		<>
			{casinoSubMenus.map(subMenuItem => (
				<LiveCasinoListItem
					key={subMenuItem?.tpGameIdNo}
					onclickCasinoItem={onclickCasinoItem}
					subMenuItem={subMenuItem}
				/>
			))}
		</>
	);
};

export default LiveCasinoList;

LiveCasinoList.propTypes = {
	casinoSubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickCasinoItem: PropTypes.func.isRequired
};
