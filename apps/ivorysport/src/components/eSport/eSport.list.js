import React from "react";
import PropTypes from "prop-types";
import EsportListItem from "./eSport.list.item";

const EsportList = ({ subMenu, maintainList, clickItem, t }) => {
	return subMenu.map(subMenuItem => {
		if (!subMenuItem.lobbyPage) return null;

		return (
			<EsportListItem
				key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
				t={t}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
				maintainList={maintainList}
			/>
		);
	});
};

export default EsportList;

EsportList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
