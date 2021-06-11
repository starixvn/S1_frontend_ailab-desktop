import React from "react";
import PropTypes from "prop-types";
import { defTabList } from "./leaderboard.def";

const LeaderboardTabs = ({ t, onChangeTab, tab }) => {
	const rows = defTabList.map(item => {
		return (
			<button
				key={`leaderboard-tab-${item.id}`}
				className={item.id === tab ? "active" : ""}
				onClick={onChangeTab.bind(this, item.id)}>
				{t(item.displayKey)}
			</button>
		);
	});

	return <div className="rankBotton">{rows}</div>;
};

LeaderboardTabs.propTypes = {
	t: PropTypes.func.isRequired,
	tab: PropTypes.number.isRequired,
	onChangeTab: PropTypes.func.isRequired
};

export default LeaderboardTabs;
