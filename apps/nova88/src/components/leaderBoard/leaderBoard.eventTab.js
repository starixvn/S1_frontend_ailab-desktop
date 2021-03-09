import React from "react";
import ButtonGroups from "./leaderBoard.btnGroups";
import config from "../../config";
import { defTabId } from "./leaderBoard.def";

export default ({
	t,
	// onChangeButton,
	categoryID,
	tab,
	rewardList,
	userInfo,
	currencyName
}) => {
	// console.log("event::", rewardList);
	const rows = rewardList.map(item => {
		return (
			<li key={`leaderBoard-event-${item.displayRank}`}>
				<div>
					{Number(item.displayRank) < 4 ? (
						<img
							src={require(`../../styles/img/no${item.displayRank}.png`)}
							alt="top_ranking"
						/>
					) : (
						<img
							src={require(`../../styles/img/gold.png`)}
							alt="top_ranking"
						/>
					)}
				</div>
				<div>{item.displayRank}</div>
				<div>
					{item.reward}
					{item.reward.slice(-3) === currencyName ? (
						<> {t("lbl_Cash")}</>
					) : null}
				</div>
			</li>
		);
	});

	return (
		<div className={`eventRule ${tab === defTabId.event ? "active" : ""}`}>
			<div className="title">
				{t("lbl_leaderboardTitle_1")}
				<br />
				{t("lbl_leaderboardTitle_2")}
			</div>
			<div className="rankList">
				<ul>
					<li>
						<div />
						<div>{t("lbl_Ranking")}</div>
						<div>{t("lbl_Prizes")}</div>
					</li>
					{rows}
				</ul>
				<a
					href={`${
						config.cloudImgUrl
					}/NovaPromotion/year-of-OX/${userInfo.langId.toUpperCase()}.html`}
					target="_blank">
					{t("lbl_MoreDetails")}
				</a>
			</div>
		</div>
	);
};
