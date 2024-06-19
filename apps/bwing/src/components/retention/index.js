import React, { useContext } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";
import { userInfoContext } from "../common/context";
import useRetentionPromotion from "./hooks/useRetentionPromotion";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import useRetentionPopup from "./hooks/useRetentionPopPop";
import Loading from "../common/loading";

// static data

const ERROR_CODES = {
	SUCCESS: 0,
	UNVERIFIED: -1003
};

const RetentionContent = () => {
	const { t } = useTranslation();
	const {
		userInfo: { langId, currencyId, isLogin }
	} = useContext(userInfoContext);
	const { retentionBonusCode, promotionDetail, loading } =
		useRetentionPromotion();

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
		navigate(`/${langId}/${path.luckyWheel.root}`);
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

	if (!isLogin && !retentionBonusCode) {
		navigate(`/${langId}`);
		return null; // Prevent rendering any content
	}

	return (
		<main className="retention">
			<img
				src={`${bannerImgUrl}/desktop/img/event/retention/retention-banner.jpg`}
				alt="retention-banner"
			/>
			<div className="eventpage-tap">
				<button onClick={handleWheel}>
					{t("Label_Retention_LuckyWheel")}
				</button>
				<button className="active">
					{t("Label_Retention_SurpriseReward")}
				</button>
			</div>

			{/* add loading state and show contents after receiving the api datas */}

			<div className="retention-wrapper">
				{loading ? (
					<>
						<div
							style={{
								background: "black",
								height: "70vh"
							}}>
							<Loading />
						</div>
					</>
				) : (
					<>
						<div className="top">
							<img
								className="top-banknote"
								src={`${bannerImgUrl}/desktop/img/event/retention/banknote.webp`}
								alt="banknote"
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
												number: custRollOver
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
										<div className="percent">
											{percentage}%
										</div>
									</div>
								</div>
							</div>
						)}

						<div className="bonus-list">
							<div className="title">
								<div>{t("Label_Retention_BonusTitle")}</div>
								<div />
							</div>
							<div />
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
					</>
				)}
			</div>
		</main>
	);
};

export default RetentionContent;
