import React from "react";
import config from "../../config";

export default ({ t, rewardList, userInfo }) => {
	const rows = rewardList?.map((item, idx) => {
		return (
			<li
				key={`leaderBoard-event-${item.displayRank}`}
				className={idx < 3 ? `no${idx + 1}` : null}>
				<div>
					<img
						src={
							idx < 3
								? require(`../../styles/img/ranking/trophy${
										Number(idx) + 1
								  }.png`)
								: require(`../../styles/img/ranking/trophy4.png`)
						}
						alt="ranking_top"
					/>

					{item.displayRank}
				</div>
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
						<div>{t("lbl_NoOfWinners")}</div>
					</li>
					{rows}
				</ul>
			</div>
			<a
				className="remind btn"
				href={`${config.t_and_cURL}/SiteSkin/Bwing/ranking/${userInfo.langId}2.html`}
				target="_blank">
				{t("lbl_MoreDetails")}
			</a>
		</>
	);
};
