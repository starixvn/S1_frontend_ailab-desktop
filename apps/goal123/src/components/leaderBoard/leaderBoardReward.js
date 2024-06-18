import React from "react";
import { useTranslation } from "react-i18next";
import { useGetLeaderboardSettingQuery } from "@ailab-desktop/service";
import config, { bannerImgUrl } from "../../config";
import { divideMillion } from "./utils/tools";

const LeaderBoardReward = () => {
	const { t } = useTranslation();
	const { data: { data: leaderboardEventData } = {} } =
		useGetLeaderboardSettingQuery({
			siteId: config.siteId,
			currencyId: 51
		});

	const { leaderboardRankingBonus = [] } = leaderboardEventData || {};

	const sortedLeaderboardRankingBonus = leaderboardRankingBonus
		.slice()
		.sort((a, b) => {
			return b.bonus - a.bonus;
		});

	return (
		<div className="leaderboard-reward">
			<div className="reward-top">
				{/* 前三名 */}
				{sortedLeaderboardRankingBonus?.slice(0, 3)?.map(item => {
					return (
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/leaderboard/top-${item?.ranking}.png`}
								alt="leaderboard-top-reward"
							/>
							<div className="text">
								<div className="text-ranking">
									{t(
										`lbl_LeaderBoard_Reward_Ranking_${item?.ranking}`
									)}
								</div>
								<div className="data-number">
									{divideMillion(item?.bonus ?? 0)}
								</div>
								<div className="text-unit">
									{t("lbl_Leaderboard_Million_Dong")}
								</div>
							</div>
						</div>
					);
				})}
			</div>
			<div className="reward-bottom">
				{/* 三名以後(不包含三) */}
				{sortedLeaderboardRankingBonus?.slice(3, 6)?.map(item => {
					return (
						<div className="item">
							<div className="text">
								<div className="text-ranking">
									{t(
										`lbl_LeaderBoard_Reward_Ranking_${item?.ranking}`
									)}
								</div>
								<div className="data-number">
									{divideMillion(item?.bonus ?? 0)}
								</div>
								<div className="text-unit">
									{t("lbl_Leaderboard_Million_Dong")}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default LeaderBoardReward;
