import React from "react";
import PropTypes from "prop-types";
import { defPageClubImg } from "../vip/vip.def";
import {
	GetCurrencyName,
	isConvert,
	number_format,
	defCurrencyList
} from "../common/common";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";

const VerificationPanel = ({
	t,
	userLevel,
	langId,
	accountName,
	phoneVerified,
	emailVerified,
	currencyId,
	phoneReward,
	emailReward,
	isLineBinding
}) => {
	const { lineLogin } = useHandleLineLogin();
	const _isConvert = isConvert(currencyId);
	const vipClubImg = userLevel ? defPageClubImg[userLevel - 1] : {};
	const currencyName = GetCurrencyName({ langId, currencyId, t });

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

	const clickLineBinding = () => {
		if (!isLineBinding) {
			lineLogin({ type: defType.binding });
		}
	};

	return (
		<div className="vipLv">
			<div className="vipbg">
				<div className="vipAnimation">
					<div />
				</div>
				<img src={vipClubImg.url} alt={vipClubImg.alt} />
			</div>
			{langId === "cs" ? (
				<div>{`${t(vipClubImg.displayKey)}${t("lbl_Club")}`}</div>
			) : (
				<div>{t(vipClubImg.displayKey)}</div>
			)}

			<div className="accountSafety">
				<div>{t("lbl_AccountSafety")}:</div>&nbsp;
				<div>{t(safetyKey)}</div>
			</div>
			<div className="safetyLv">
				<span className={accountSafety >= 1 ? "active" : ""} />
				<span className={accountSafety >= 2 ? "active" : ""} />
				<span className={accountSafety >= 3 ? "active" : ""} />
			</div>

			<div className="userVerification">
				<div>{t("lbl_UserVerification")}:</div>
				<div>
					<div
						className={`icon icon-person${
							accountName ? " active" : ""
						}`}>
						<div className="description">
							<div className="title">
								{t("lbl_ProfileVerification")}
							</div>
							<div>{t("lbl_ProfileVerificationHint1")}</div>
							<div>({t("lbl_ProfileVerificationHint2")})</div>
						</div>
					</div>
					<div
						className={`icon icon-email${
							emailVerified ? " active" : ""
						}`}>
						<div className="description">
							<div className="title">
								{t("lbl_EmailVerification")}
							</div>
							<div>{t("lbl_EmailVerificationHint1")}</div>
							<div>
								{t("lbl_EmailVerificationHint2", {
									currency: currencyName,
									amount: number_format(
										emailReward,
										_isConvert
									)
								})}
							</div>
						</div>
					</div>
					<div
						className={`icon icon-mobile${
							phoneVerified ? " active" : ""
						}`}>
						<div className="description">
							<div className="title">
								{t("lbl_PhoneVerification")}
							</div>
							<div>{t("lbl_PhoneVerificationHint1")}</div>
							<div>
								{t("lbl_PhoneVerificationHint2", {
									currency: currencyName,
									amount: number_format(
										phoneReward,
										_isConvert
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

			{currencyId === defCurrencyList.THB && (
				<>
					<div className="btnGroup">
						<button
							className={`btn-line${
								isLineBinding ? " active" : ""
							}`}
							onClick={clickLineBinding}>
							<i className="icon icon-line-bold" />
							{isLineBinding
								? t("lineRegister.lbl_Connected")
								: t("lineRegister.lbl_Connect")}
						</button>
					</div>
					{!isLineBinding && (
						<div className="txt-line">
							{t("lineRegister.lbl_LinkLineAccount")}
						</div>
					)}
				</>
			)}
		</div>
	);
};

VerificationPanel.defaultProps = {
	accountName: "",
	phoneVerified: false,
	emailVerified: false,
	phoneReward: 0,
	emailReward: 0,
	currencyId: null,
	userLevel: 1,
	isLineBinding: false
};

VerificationPanel.propTypes = {
	t: PropTypes.func.isRequired,
	userLevel: PropTypes.number,
	langId: PropTypes.string.isRequired,
	accountName: PropTypes.string,
	phoneVerified: PropTypes.bool,
	emailVerified: PropTypes.bool,
	currencyId: PropTypes.number,
	phoneReward: PropTypes.number,
	emailReward: PropTypes.number,
	isLineBinding: PropTypes.bool
};

export default VerificationPanel;
