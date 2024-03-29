import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../../config";
import { REWARD_ITEMS } from "../def";
import { numFormatToDigits } from "../../common/common";

const RewardItemWinner = () => {
	const { t } = useTranslation();
	// 從def修改獲獎玩家
	const semiFinalsData = REWARD_ITEMS[REWARD_ITEMS.length - 1];
	return (
		<>
			<div className="bottom-title">
				<img
					src={`${bannerImgUrl}/desktop/img/event/eurocup/title-item.png`}
					alt=""
				/>
				<span>{t("lbl_CupEvent_RewardItem")}</span>
			</div>
			<div className="reward-winner">
				<div>
					{REWARD_ITEMS.slice(0, 2).map(
						({ key, displayKey, amount, count, winners }) => (
							<div className="reward-item" key={key}>
								<div className="title">
									{t(displayKey)}
									{key === 1 && (
										<img
											src={`${bannerImgUrl}/desktop/img/event/eurocup/crown.png`}
											alt=""
										/>
									)}
								</div>
								<div>
									<div className="reward-item-text">
										<span>
											{t("lbl_CupEvent_CashPrize")}
										</span>
										<div>
											{numFormatToDigits(amount, 0)} VND
										</div>
									</div>
									<div className="reward-item-text">
										<span>
											{t("lbl_CupEvent_PrizeCount")}
										</span>
										<div>{count}</div>
									</div>
								</div>
								<div>
									<span>{t("lbl_CupEvent_Winners")}</span>
									<span>{winners.join("、")}</span>
								</div>
							</div>
						)
					)}
				</div>

				<div className="reward-item semi" key={semiFinalsData.key}>
					<div className="title">{t(semiFinalsData.displayKey)}</div>
					<div>
						<div className="reward-item-text">
							<span>{t("lbl_CupEvent_CashPrize")}</span>
							<div>
								{numFormatToDigits(semiFinalsData.amount, 0)}{" "}
								VND
							</div>
						</div>
						<div className="reward-item-text">
							<span>{t("lbl_CupEvent_PrizeCount")}</span>
							<div>{semiFinalsData.count}</div>
						</div>
					</div>
					<div>
						<span>{t("lbl_CupEvent_Winners")}</span>
						<span>{semiFinalsData.winners.join("、")}</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default RewardItemWinner;
