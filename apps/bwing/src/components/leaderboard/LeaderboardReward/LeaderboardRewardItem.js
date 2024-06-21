import React from "react";
import PropTypes from "prop-types";

/** 其他名次獎勵項目 */
const LeaderboardRewardItem = ({ ranking, bonus, convertToMillion, t }) => {
	return (
		<div className="item">
			<div className="text">
				<div className="text-ranking">
					{t(`leaderbord_rank_${ranking}`)}
				</div>
				<div className="data-number">{convertToMillion(bonus)}</div>
				<div className="text-unit">{t("leaderboard_millionDong")}</div>
			</div>
		</div>
	);
};

/** 其他名次獎勵項目 */
export default LeaderboardRewardItem;

LeaderboardRewardItem.propTypes = {
	t: PropTypes.func.isRequired,
	ranking: PropTypes.string.isRequired,
	bonus: PropTypes.number.isRequired,
	convertToMillion: PropTypes.func.isRequired
};
