import React, { useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import useRetentionPromotion from "./hooks/useRetentionPromotion";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import useRetentionPopup from "./hooks/useRetentionPopup";
import router from "../../router";

// static data

const ERROR_CODES = {
	SUCCESS: 0,
	UNVERIFIED: -1003
};

const RetentionContent = () => {
	const { t } = useTranslation();
	const {
		userInfo: { currencyId, langId }
	} = useContext(userInfoContext);
	const { retentionBonusCode, promotionDetail } = useRetentionPromotion();
	const { openSuccessPopup, openVerificationPopup, openErrorPopup } =
		useRetentionPopup();

	const {
		isJoin = false,
		canJoin = false,
		custTurnOver = 0,
		custRollOver = 0,
		maxAmount = 0,
		details = ""
	} = promotionDetail ?? {};

	const percentage =
		custTurnOver >= custRollOver
			? 100
			: ((custTurnOver / custRollOver) * 100).toFixed(2);

	const handleWheel = () => {
		navigate(`/${langId}/${router.luckyWheel.root}`);
	};

	const handleJoinPromotion = async () => {
		try {
			//  destructuring the response object and giving default values
			const { data: { errorCode = null, message = "" } = {} } =
				await api_promotion_SetClaimPromotion({
					langId,
					BonusCode: retentionBonusCode,
					LockedAmount: maxAmount
				});
			// use object literal to replace if-else statement to enhance readability and flexibility
			const errorCodeActions = {
				[ERROR_CODES.SUCCESS]: openSuccessPopup,
				[ERROR_CODES.UNVERIFIED]: openVerificationPopup,
				others: () => openErrorPopup(message, errorCode)
			};
			// call the function based on the errorCode
			(errorCodeActions[errorCode] || errorCodeActions.others)();
		} catch (error) {
			console.error("Error claiming promotion:", error);
		}
	};

	return (
		<main className="retention">
			<div className="eventpage-tap">
				<button onClick={handleWheel}>
					{t("Label_Retention_LuckyWheel")}
				</button>
				<button className="active">
					{t("Label_Retention")}
				</button>
			</div>

			{/* add loading state and show contents after receiving the api datas */}

			<div className="retention-wrapper">
				<div className="top">
					<img
						className="top-chips"
						src={`${bannerImgUrl}/desktop/img/event/retention/chips.webp`}
						alt="retention-chips"
					/>
					<img
						className="top-item"
						src={`${bannerImgUrl}/desktop/img/event/retention/title.png`}
						alt="retention-banner"
					/>
					{promotionDetail && canJoin && (
						<button
							className="top-btn"
							onClick={handleJoinPromotion}>
							{t("lbl_Promotion_ClaimNow")}
						</button>
					)}
				</div>
				<div className="retention-title">
					{t("Label_Retention_Title")}
					<div>{t("Label_Retention_Content")}</div>
				</div>

				{isJoin && (
					<div className="turnover-progress">
						<div className="turnover-title">
							{t("Label_Retention_TurnoverTitle")}
						</div>
						<div className="turnover-item">
							<div>
								<div className="number">
									{t(`Currency_${currencyId}`)}{" "}
									{number_format({
										number: custTurnOver
									})}
									<div>
										/ {t("lbl_Req")}.
										{number_format({
											number: custRollOver
										})}
									</div>
								</div>
								<div className="progress">
									<div
										className="progress-bar"
										style={{
											width: `${percentage}%`
										}}
									/>
								</div>
								<div className="percent">{percentage}%</div>
							</div>
						</div>
					</div>
				)}

				<div className="bonus-list">
					<div className="title">
					
						<div />
					</div>
					{/* for css need */}
					<div />
					{/* for css need */}
					{!details && <div />}
					{details && (
						<div
							dangerouslySetInnerHTML={{
								__html: `<div>${details}</pre>`
							}}
						/>
					)}
				</div>
				<div className="retention-footer">
					<img
						src={`${bannerImgUrl}/desktop/img/event/retention/retention-footer.jpg`}
						alt="retention-footer"
					/>
				</div>
			</div>
		</main>
	);
};

export default RetentionContent;
