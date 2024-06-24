import React from "react";
import { useLeaderBoard } from "./Leaderboard-context";

/** 規則表示 */
const LeaderboardTerm = () => {
	const { t } = useLeaderBoard();
	return (
		<div className="info-term">
			<div className="title">{t("leaderbord_TermTitle")}</div>
			<div className="term-content">
				<ul>
					<li>{t("leaderbord_Term_1")}</li>
					<li>{t("leaderbord_Term_2")}</li>
					<li>{t("leaderbord_Term_3")}</li>
				</ul>
			</div>
		</div>
	);
};

/** 規則表示 */
export default LeaderboardTerm;
