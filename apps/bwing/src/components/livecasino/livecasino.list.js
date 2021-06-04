import React from "react";
import PropTypes from "prop-types";
import LiveCasinoListItem from "./livecasino.list.item";
import comingImg from "../../styles/img/livelobby/coming.png";

const COLUMN_CCOUNT = 6;

const LiveCasinoList = ({ subMenu, clickItem }) => {
	const filterSubMenu = subMenu.filter(subMenuItem => subMenuItem?.lobbyPage);
	const subMenuCount = filterSubMenu.length;
	const comingImgCount = COLUMN_CCOUNT - (subMenuCount % COLUMN_CCOUNT);

	const countToArray = num => Array.apply("test", { length: num });

	return (
		<div className="livelobbyList">
			{filterSubMenu.map(subMenuItem => (
				<LiveCasinoListItem
					key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
					clickItem={clickItem}
					subMenuItem={subMenuItem}
				/>
			))}

			{comingImgCount < COLUMN_CCOUNT
				? countToArray(comingImgCount).map((_, idx) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={idx}>
							<img src={comingImg} alt="comingsoon.jpg" />
						</div>
				  ))
				: null}
		</div>
	);
};

export default LiveCasinoList;

LiveCasinoList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};
