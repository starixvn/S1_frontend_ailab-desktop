import React from "react";
import PropTypes from "prop-types";
import { defPageClubImg } from "../vip/vip.def";
import { number_format } from "../common/common";
import { bannerImgUrl } from "../../config";

const VerificationPanel = ({
	t,
	userLevel,
	accountName,
	phoneVerified,
	emailVerified,
	phoneReward,
	emailReward
}) => {
	const vipClubImg = userLevel ? defPageClubImg[userLevel - 1] : {};
	const accountSafety = [
		Boolean(accountName),
		phoneVerified,
		emailVerified
	].filter(Boolean).length;

	let safetyKey = "";
	if (accountSafety < 2) {
		safetyKey = "lbl_Weak";
	} else if (accountSafety === 2) {
		safetyKey = "lbl_Normal";
	} else if (accountSafety > 2) {
		safetyKey = "lbl_Excellent";
	}

	return (
		<div className="grade">
			<div className="porfileVip">
				<img src={vipClubImg?.img} alt={vipClubImg?.alt} />
				<div>{t(vipClubImg?.displayKey)}</div>
			</div>
			<div className="user">
				<div className="txt-lightgray">
					{t("lbl_ProfileModifyWarning")}
				</div>
				<div className="txt-blue15">{t("lbl_UserVerification")}</div>
				<div className="item">
					<button
						className={`icon icon-member${
							accountName ? " active" : ""
						}`}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/coinimg.png`}
							alt="coin"
						/>
						<div className="hint">
							<span>{t("lbl_ProfileVerification")}</span>
							{t("lbl_ProfileVerificationHint")}
						</div>
					</button>
					<button
						className={`icon icon-email${
							emailVerified ? " active" : ""
						}`}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/coinimg.png`}
							alt="coin"
						/>
						<div className="hint">
							<span>{t("lbl_EmailVerification")}</span>
							{t("lbl_EmailVerificationHint", {
								amount: number_format({ number: emailReward })
							})}
						</div>
					</button>
					<button
						className={`icon icon-mobile${
							phoneVerified ? " active" : ""
						}`}
					>
						<img
							src={`${bannerImgUrl}/desktop/img/coinimg.png`}
							alt="coin"
						/>
						<div className="hint">
							<span>{t("lbl_PhoneVerification")}</span>
							{t("lbl_PhoneVerificationHint", {
								amount: number_format({ number: phoneReward })
							})}
						</div>
					</button>
				</div>
			</div>
			<div className="user">
				<div className="txt-blue15">
					{t("lbl_AccountSafety")}:<span>{t(safetyKey)}</span>
				</div>
				<div className="level">
					<div
						className={`weak${accountSafety >= 1 ? " active" : ""}`}
					/>
					<div
						className={`nomal${
							accountSafety >= 2 ? " active" : ""
						}`}
					/>
					<div
						className={`good${accountSafety >= 3 ? " active" : ""}`}
					/>
				</div>
			</div>
		</div>
	);
};

VerificationPanel.defaultProps = {
	accountName: "",
	phoneVerified: false,
	emailVerified: false,
	phoneReward: 0,
	emailReward: 0,
	userLevel: 1
};

VerificationPanel.propTypes = {
	t: PropTypes.func.isRequired,
	userLevel: PropTypes.number,
	accountName: PropTypes.string,
	phoneVerified: PropTypes.bool,
	emailVerified: PropTypes.bool,
	phoneReward: PropTypes.number,
	emailReward: PropTypes.number
};

export default VerificationPanel;
