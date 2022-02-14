import React from "react";
import PropTypes from "prop-types";
import config from "../../config";
import { defTabId, defRewardTabId } from "./leaderBoard.def";

const leaderBoardEventContent = ({
	t,
	currencyName,
	userInfo,
	tab,
	rewardList,
	changeRewardTab,
	rewardTab
}) => {
	const rows = rewardList.map((item, idx) => {
		return (
			<li key={`leaderBoard-event-${item.displayRank}`}>
				<div>
					{idx + 1 < 4 ? (
						<img
							src={require(`../../styles/img/no${idx + 1}.png`)}
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

	const linkToTnc = () => {
		window.open(
			`${config.cloudImgUrl}/NovaPromotion/UEFAEuro/${userInfo.langId}.html`
		);
	};

	return (
		<div className={`eventRule ${tab === defTabId.first ? "active" : ""}`}>
			<div className="title">
				{t("lbl_leaderboardTitle_1")}
				<br />
				{t("lbl_leaderboardTitle_2")}
			</div>
			<div className="rankTag">
				<div className="btnGroup">
					<button
						className={
							rewardTab === defRewardTabId.final ? "active" : ""
						}
						onClick={changeRewardTab.bind(
							this,
							defRewardTabId.final
						)}
					>
						{t("lbl_EURO_2020_Final")}
					</button>
					<button
						className={
							rewardTab === defRewardTabId.monthly ? "active" : ""
						}
						onClick={changeRewardTab.bind(
							this,
							defRewardTabId.monthly
						)}
					>
						{t("lbl_Monthly_Tournament")}
					</button>
				</div>
			</div>
			<div className="rankList">
				<div
					className={
						rewardTab === defRewardTabId.final ? "active" : ""
					}
				>
					<ul>
						<li>
							<div />
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Prizes")}</div>
						</li>
						{rows}
					</ul>
				</div>
				<div
					className={
						rewardTab === defRewardTabId.monthly ? "active" : ""
					}
				>
					<div className="stitle">
						{t("lbl_Monthly_Deposit_Turnover_Race_Tournament")}
					</div>
					<div className="timeLine">
						<div>{t("lbl_Mar")}</div>
						<div>
							{t("lbl_Apr")}
							<div>
								{t("lbl_Stage1")}
								<div>2021 3/13 - 4/12</div>
							</div>
						</div>
						<div>
							{t("lbl_May")}
							<div>
								{t("lbl_Stage2")}
								<div>2021 4/13 - 5/12</div>
							</div>
						</div>
						<div>
							{t("lbl_Jun")}
							<div>
								{t("lbl_Stage3")}
								<div>2021 5/13 - 6/12</div>
							</div>
						</div>
					</div>
					<ul>
						<li>
							<div />
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Bonus_credit")}</div>
						</li>
						{rows}
					</ul>
				</div>
				<button onClick={linkToTnc}>{t("lbl_MoreDetails")}</button>
			</div>
		</div>
	);
};

leaderBoardEventContent.propTypes = {
	t: PropTypes.func.isRequired,
	currencyName: PropTypes.string.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	tab: PropTypes.number.isRequired,
	rewardList: PropTypes.arrayOf(PropTypes.object).isRequired,
	changeRewardTab: PropTypes.func.isRequired,
	rewardTab: PropTypes.number.isRequired
};
export default leaderBoardEventContent;
