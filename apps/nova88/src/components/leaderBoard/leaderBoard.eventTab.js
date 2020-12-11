import React from "react";
import { number_format } from "../common/common";

const eventListData = [
	{ displayRank: "1", reward: 1000000 },
	{ displayRank: "2", reward: 500000 },
	{ displayRank: "3", reward: 200000 }
	// { displayRank: "4-7", reward: 50000 },
	// { displayRank: "8-10", reward: 10000 }
];

export default ({ t }) => {
	const rows = eventListData.map(item => {
		return (
			<li key={`leaderBoard-event-${item.displayRank}`}>
				{parseInt(item.displayRank) < 4 ? (
					<div>
						<img
							src={require(`../../styles/img/no${item.displayRank}.png`)}
						/>
					</div>
				) : (
					<div></div>
				)}
				<div>
					{t("lbl_Top")} {item.displayRank}
				</div>
				<div>{number_format(item.reward)}</div>
			</li>
		);
	});

	return (
		<>
			<div className="title">{t("lbl_EventTitle")}</div>
			<div className="rankList">
				<ul>
					<li>
						<div></div>
						<div>{t("lbl_Ranking")}</div>
						<div>{t("lbl_Rewards")}</div>
					</li>
					{rows}
				</ul>
			</div>
			<a href="">{t("lbl_MoreDetails")}</a>
		</>
	);
};
