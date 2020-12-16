import React from "react";
import { defRewardList } from "./leaderboard.def";

export default ({ children }) => {
	return (
		<div className="left">
			{children}
			<img
				className="mb-2"
				src={require("../../styles/img/champion.png")}
			/>
			<div className="highest person">
				<span>VND {defRewardList["VND"][0].reward}</span>
			</div>
		</div>
	);
};
