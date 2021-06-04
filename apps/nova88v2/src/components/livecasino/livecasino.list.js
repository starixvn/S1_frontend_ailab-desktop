import React from "react";
import PropTypes from "prop-types";
import LiveCasinoListItem from "./livecasino.list.item";
import config from "../../config";

const COLUMN_CCOUNT = 3;

const LiveCasinoList = ({ subMenu, clickItem, t }) => {
	const filterSubMenu = subMenu.filter(subMenuItem => subMenuItem?.lobbyPage);
	const subMenuCount = filterSubMenu.length;
	const comingImgCount = COLUMN_CCOUNT - (subMenuCount % COLUMN_CCOUNT);

	const countToArray = num => Array.apply("", { length: num });

	return (
		<div className="livecasino">
			{filterSubMenu.map(subMenuItem => {
				if (!subMenuItem.lobbyPage) return null;

				return (
					<LiveCasinoListItem
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						t={t}
						clickItem={clickItem}
						subMenuItem={subMenuItem}
					/>
				);
			})}

			{comingImgCount < COLUMN_CCOUNT
				? countToArray(comingImgCount).map((_, idx) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={idx}>
							<img
								src={`${config.bannerImgUrl}/img/livecasino/comingsoon.jpg`}
								alt="comingsoon.jpg"
							/>
						</div>
				  ))
				: null}
		</div>
	);
};

export default LiveCasinoList;

LiveCasinoList.propTypes = {
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired
};
