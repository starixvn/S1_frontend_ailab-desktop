import React from "react";
import PropTypes from "prop-types";
import LobbyListItem from "../common-lobby/LobbyListItem";

const LotteryList = ({ subMenu }) => {
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

export default LotteryList;

LotteryList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired
};
