import React from "react";
import PropTypes from "prop-types";
import LiveCasinoListItem from "./livecasino.list.item";

// const COLUMN_CCOUNT = 4;

const LiveCasinoList = ({ subMenu, clickItem, t, maintainList }) => {
	const filterSubMenu = subMenu.filter(subMenuItem => subMenuItem?.lobbyImg);
	// const subMenuCount = filterSubMenu.length;
	// const comingImgCount = COLUMN_CCOUNT - (subMenuCount % COLUMN_CCOUNT);

	// const countToArray = num => Array.apply("", { length: num });

	return (
		<div className="livelobbyList newTop">
			{filterSubMenu.map(subMenuItem => (
				<LiveCasinoListItem
					key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
					t={t}
					clickItem={clickItem}
					subMenuItem={subMenuItem}
					maintainList={maintainList}
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
		</div>
	);
};

export default LiveCasinoList;

LiveCasinoList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
