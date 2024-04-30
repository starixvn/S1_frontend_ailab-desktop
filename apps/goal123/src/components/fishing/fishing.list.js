import React from "react";
import PropTypes from "prop-types";
import LobbyListItem from "../common-lobby/LobbyListItem";

const FishingList = ({ subMenu }) => {
	return (
		<div className="lobby-list">
			{subMenu.map(subMenuItem => {
				if (!subMenuItem.lobbyPage) return null;
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

export default FishingList;

FishingList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired
};
