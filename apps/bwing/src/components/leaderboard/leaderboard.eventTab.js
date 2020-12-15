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
			<div className="ranInBox">
				<h1 className="title">{t("lbl_leaderboardTitle_1")}</h1>
				<div className="ranlist event">
					<ul>
						<li>
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Rewards")}</div>
							<div>No. of winners</div>
						</li>
						{rows}
					</ul>
				</div>
				<p
					className="remind"
					href={`${
						config.cloudImgUrl
					}/NovaPromotion/iPhone12Giveaway/${userInfo.langId.toUpperCase()}.html`}
					target="_blank">
					{t("lbl_MoreDetails")}
				</p>
			</div>
			<div className="ranInBox ranInBox2">
				<div className="textBox">
					<h1>NO.1 REWARD</h1>
					<p>IPHONE 12 PRO MAX(256GB)</p>
				</div>
				<img
					src={require("../../styles/img/ranking/iphone.png")}
					alt="iphone"
				/>
			</div>
		</>
	);
};
