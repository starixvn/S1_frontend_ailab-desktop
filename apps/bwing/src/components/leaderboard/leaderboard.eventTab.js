import React from "react";
import { number_format } from "../common/common";
import config from "../../config";

export default ({
	t,
	onChangeGameType,
	categoryID,
	tab,
	rewardList,
	userInfo,
	currencyName
}) => {
	const rows = rewardList?.map((item, idx) => {
		return (
			<li
				key={`leaderBoard-event-${item.displayRank}`}
				className={idx < 3 ? `no${idx + 1}` : null}>
				{parseInt(item.displayRank) === 1 ? (
					<div>
						<img
							src={require(`../../styles/img/ranking/trophy1.png`)}
							alt="top_ranking"
						/>
					</div>
				) : (
					<div>{item.displayRank}</div>
				)}
				<div>{item.reward}</div>
				<div>{item.winnersNum}</div>
			</li>
		);
	});

	return (
		<>
			<h1 className="title">
				{t("lbl_leaderboardTitle_1").toUpperCase()}
			</h1>
			<h1 className="title">
				{t("lbl_leaderboardTitle_2").toUpperCase()}
			</h1>
			<div className="ranklist event">
				<ul>
					<li>
						<div>{t("lbl_Ranking")}</div>
						<div>{t("lbl_Rewards")}</div>
						<div>No. of winners</div>
					</li>
					{rows}
				</ul>
			</div>
			<a
				className="remind btn"
				href={`${config.t_and_cURL}/SiteSkin/Bwing/ranking/${userInfo.langId}.html`}
				target="_blank">
				{t("lbl_MoreDetails")}
			</a>
		</>
	);
};
