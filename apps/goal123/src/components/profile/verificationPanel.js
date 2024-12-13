import React from "react";
import PropTypes from "prop-types";
import { defPageClubImg } from "../vip/vip.def";
import { number_format } from "../common/common";
import { bannerImgUrl } from "../../config";

const safety = {
	displayKey: "",
	bar: ""
};

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

	switch (accountSafety) {
		case 1:
			safety.displayKey = "lbl_Weak";
			safety.bar = "weak";
			break;

		case 2:
			safety.displayKey = "lbl_Normal";
			safety.bar = "normal";
			break;

		case 3:
			safety.displayKey = "lbl_Excellent";
			safety.bar = "strong";
			break;

		default:
			safety.displayKey = "lbl_Weak";
			safety.bar = "";
			break;
	}

	return (
		<div className="profileInfo">
			{userLevel ? (
				<div className="vipLv">
					<div className="vipbg">
						<div className="circle" />
						<img src={vipClubImg?.img} alt={vipClubImg?.alt} />
					</div>
					<div>{t(vipClubImg?.displayKey)}</div>
				</div>
			) : null}

			<div className="securityRate">
				<div className={`title ${safety.bar}`}>
					{t("lbl_AccountSafety")}
					<span>{t(safety.displayKey)}</span>
				</div>
				<div className="rateBar">
					<div />
					<div />
					<div />
				</div>
			</div>
			<div className="verification">
				<div className="title">{t("lbl_UserVerification")}</div>
				<div className="items">
					<div className={accountName ? "active" : ""}>
						<img
							src={`${bannerImgUrl}/desktop/img/profile.svg`}
							alt="Profile Verification"
						/>
						<i className="icon icon-checkmark" />
						<div className="info">
							<div className="title">
								{t("lbl_ProfileVerification")}
							</div>
							{t("lbl_ProfileVerificationHint")}
						</div>
					</div>
					<div className={emailVerified ? "active" : ""}>
						<img
							src={`${bannerImgUrl}/desktop/img/email.svg`}
							alt="Email Verification"
						/>
						<i className="icon icon-checkmark" />
						<i className="icon icon-money" />
						<div className="info">
							<div className="title">
								{t("lbl_EmailVerification")}
							</div>
							{t("lbl_EmailVerificationHint", {
								amount: number_format({ number: emailReward })
							})}
						</div>
					</div>
					<div className={phoneVerified ? "active" : ""}>
						<img
							src={`${bannerImgUrl}/desktop/img/phone.svg`}
							alt="Phone Verification"
						/>
						<i className="icon icon-checkmark" />
						<i className="icon icon-money" />
						<div className="info">
							<div className="title">
								{t("lbl_PhoneVerification")}
							</div>
							{t("lbl_PhoneVerificationHint", {
								amount: number_format({ number: phoneReward })
							})}
						</div>
					</div>
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
