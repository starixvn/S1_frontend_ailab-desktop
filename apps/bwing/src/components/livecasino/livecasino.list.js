import React from "react";
import PropTypes from "prop-types";
import LiveCasinoListItem from "./livecasino.list.item";

// const COLUMN_CCOUNT = 6;

const LiveCasinoList = ({ subMenu, clickItem, maintainList }) => {
	const filterSubMenu = subMenu.filter(subMenuItem => subMenuItem?.lobbyPage);
	// const subMenuCount = filterSubMenu.length;
	// const comingImgCount = COLUMN_CCOUNT - (subMenuCount % COLUMN_CCOUNT);
	// const countToArray = num => Array.apply("test", { length: num });

	return (
		<>
			{filterSubMenu.map(subMenuItem => (
				<LiveCasinoListItem
					key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
					clickItem={clickItem}
					subMenuItem={subMenuItem}
					maintainList={maintainList}
					img={subMenuItem.img}
				/>
			))}

			{/* {comingImgCount < COLUMN_CCOUNT
				? countToArray(comingImgCount).map((_, idx) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={idx}>
							<img src={comingImg} alt="comingsoon.jpg" />
						</div>
				  ))
				: null} */}
		</>
	);
};

export default LiveCasinoList;

LiveCasinoList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
