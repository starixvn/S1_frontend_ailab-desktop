import React from "react";
import { number_format } from "../common/common";
import config from "../../config";
import { defTabId, defImgRankId } from "./leaderboard.def";

export default ({ t, tab, rewardList, userInfo }) => {
	const rewardTotalValue = "161,000,000";

	return (
		<div
			className={`rank_content ${
				tab === defTabId.event ? "active" : ""
			}`}>
			<div className="left">
				<img src={require("../../styles/img/coins.png")} />
				<div className="highest">
					{t("lbl_TotalValue")}
					<span>VND {rewardTotalValue}</span>
				</div>
			</div>
			<div className="right">
				<div className="title">{t("lbl_Goal123_EventTitle")}</div>
				<div className="titleGroup" />
				<div className="rankingList">
					<ul>
						<li>
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Rewards")}</div>
						</li>

						{rewardList?.map((item, idx) => {
							return (
								<li
									key={`leaderboard_item_${item.displayRank}`}>
									<div>
										<img
											src={require(`../../styles/img/${
												idx <= 2
													? defImgRankId[idx + 1]
													: `nbadge`
											}.png`)}
										/>
										{rewardList[idx].displayRank}
									</div>
									<div>
										{`VND ${number_format(item.reward)}`}
									</div>
								</li>
							);
						})}
					</ul>
				</div>

				<a
					className="more"
					href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/ranking/${userInfo.langId}.html`}
					target="_blank">
					{t("lbl_MoreDetails")}
				</a>
			</div>
		</div>
	);
};
