import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../../config";

/** 前三名獎勵項目 */
const LeaderboardRewardTop3Item = ({
	ranking,
	bonus,
	convertToMillion,
	RANK,
	t
}) => {
	return (
		<div className="item">
			<img
				src={`${bannerImgUrl}/desktop/img/leaderboard/${RANK[ranking]}.png`}
				alt={`${RANK[ranking]}`}
			/>
			<div className="text">
				<div className="data-number">{convertToMillion(bonus)}</div>
				<div className="text-unit">{t("leaderboard_millionDong")}</div>
			</div>
		</div>
	);
};

/** 前三名獎勵項目 */
export default LeaderboardRewardTop3Item;

LeaderboardRewardTop3Item.propTypes = {
	t: PropTypes.func.isRequired,
	ranking: PropTypes.string.isRequired,
	bonus: PropTypes.number.isRequired,
	convertToMillion: PropTypes.func.isRequired,
	RANK: PropTypes.object.isRequired
};
