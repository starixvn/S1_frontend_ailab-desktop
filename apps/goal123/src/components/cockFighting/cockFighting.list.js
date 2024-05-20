import React from "react";
import PropTypes from "prop-types";
import LobbyListItem from "../common-lobby/LobbyListItem";

const CockFightingList = ({ subMenu }) => {
	return (
		<div className="lobby-list">
			{subMenu.map(subMenuItem => {
				return (
					<LobbyListItem
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						subMenuItem={subMenuItem}
					/>
				);
			})}
		</div>
	);
};

export default CockFightingList;

CockFightingList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired
};
