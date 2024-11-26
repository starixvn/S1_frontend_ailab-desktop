import React from "react";
import PropTypes from "prop-types";
import { useCaptchaContext } from "@ailab-desktop/common";
import { CaptchaTypeEnum } from "@ailab-desktop/service";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Checkbox from "../common/checkbox";

const JoinForm = ({
	t,
	openLogin,
	userValue,
	tip,
	clickInfo,
	EditField,
	checkValue,
	showPwdState,
	showPwdHandler,
	checkboxHandler,
	configSiteName,
	tandCTerms,
	tandCRule,
	clickCancel,
	clickSubmit,
	_areaCode,
	urlAffiliate
}) => {
	const { Captcha, captchaType } = useCaptchaContext();
	return (
		<form className="joinloginFunction" onSubmit={clickSubmit}>
			<span className="title txt-yellow">{t("lbl_JoinNow")}</span>
			<div>
				{t("lbl_LoginMsg")}
				<button className="txt-blue2" type="button" onClick={openLogin}>
					{t("lbl_LoginHere")}
				</button>
			</div>
			<div className="inputModule">
				<Inputbox
					icon="icon-member txt-blue12"
					placeholder={t("lbl_Username")}
					value={userValue.username}
					tip={tip.username.msg}
					checked={tip.username.checked}
					clickInfo={clickInfo.bind(this, "username")}
					onChange={EditField.bind(null, "username")}
					onBlur={checkValue.bind(null, "username")}
				/>
				<InputboxPSW
					icon="icon-key txt-blue12"
					inputType={`${
						!showPwdState.password ? "password" : "text"
					}`}
					placeholder={t("lbl_Password")}
					value={userValue.password}
					tip={tip.password.msg}
					onChange={EditField.bind(null, "password")}
					onBlur={checkValue.bind(null, "password")}
					showPsw={showPwdState.password}
					showPswHandler={() => {
						showPwdHandler("password");
					}}
					checked={tip.password.checked}
				/>
				<InputboxPSW
					icon="icon-key txt-blue12"
					inputType={`${
						!showPwdState.confirmPwd ? "password" : "text"
					}`}
					placeholder={t("lbl_ConfirmPassword")}
					value={userValue.confirmPwd}
					tip={tip.confirmPwd.msg}
					onChange={EditField.bind(null, "confirmPwd")}
					onBlur={checkValue.bind(null, "confirmPwd")}
					showPsw={showPwdState.confirmPwd}
					showPswHandler={() => {
						showPwdHandler("confirmPwd");
					}}
					checked={tip.confirmPwd.checked}
				/>
				<Inputbox
					icon="icon-member txt-blue12"
					placeholder={t("lbl_RealName")}
					value={userValue.realName}
					tip={tip.realName.msg}
					checked={tip.realName.checked}
					clickInfo={clickInfo.bind(this, "realName")}
					onChange={EditField.bind(null, "realName")}
					onBlur={checkValue.bind(null, "realName")}
				/>
				<Inputbox
					icon="icon-phone txt-blue12"
					areaCode={_areaCode}
					placeholder={t("lbl_Phone")}
					value={userValue.phone}
					tip={tip.phone.msg}
					checked={tip.phone.checked}
					clickInfo={clickInfo.bind(this, "phone")}
					onChange={EditField.bind(null, "phone")}
					onBlur={checkValue.bind(null, "phone")}
				/>
				{/* <Inputbox */}
				{/* 	icon="icon-email txt-blue12" */}
				{/* 	placeholder={t("lbl_Email")} */}
				{/* 	value={userValue.email} */}
				{/* 	tip={tip.email.msg} */}
				{/* 	checked={tip.email.checked} */}
				{/* 	clickInfo={clickInfo.bind(this, "email")} */}
				{/* 	onChange={EditField.bind(null, "email")} */}
				{/* 	onBlur={checkValue.bind(null, "email")} */}
				{/* /> */}
				<Inputbox
					icon="icon-affiliate txt-blue12"
					placeholder={t("lbl_Affiliate_ID")}
					value={userValue.affiliate}
					onChange={EditField.bind(null, "affiliate")}
					onBlur={checkValue.bind(null, "affiliate")}
					readOnly={urlAffiliate && userValue.affiliate}
					tip={tip.affiliate.msg}
					checked={tip.affiliate.checked}
					clickInfo={clickInfo.bind(this, "affiliate")}
				/>
				{tip.currency.msg !== "" ? (
					<div className="tip active">{tip.currency.msg}</div>
				) : null}
			</div>

			<Captcha />
			{captchaType === CaptchaTypeEnum.Number && (
				<Inputbox
					value={userValue.reCaptchaToken}
					onChange={EditField.bind(null, "reCaptchaToken")}
					placeholder={t("Label_General_EnterCaptchaCode")}
				/>
			)}

			<div className="Terms">
				<Checkbox
					id="joinAgreeCheck"
					checked={userValue.agreeCheck}
					onChange={checkboxHandler.bind(null, "agreeCheck")}
				>
					{t("lbl_Check18TC1")}&nbsp;
					<a target="_blank" rel="noreferrer" href={tandCTerms}>
						{t("lbl_TermsConditions")}
					</a>
					&nbsp;
					{t("lbl_Check18TC2")}&nbsp;
					<a target="_blank" rel="noreferrer" href={tandCRule}>
						{t("lbl_RuleRegulations")}
					</a>
					&nbsp;
					{t("lbl_Check18TC3")}&nbsp;{configSiteName}.
					{t("lbl_Check18TC4")}
				</Checkbox>
			</div>
			{tip.checkbox.msg !== "" ? (
				<div className="tip active">{tip.checkbox.msg}</div>
			) : null}

			<div className="btnGroup">
				<button
					type="button"
					className="btn-cancel"
					onClick={clickCancel}
				>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" type="submit">
					{t("lbl_Submit")}
				</button>
			</div>
		</form>
	);
};

JoinForm.defaultProps = {
	_areaCode: null,
	urlAffiliate: null
};

JoinForm.propTypes = {
	t: PropTypes.func.isRequired,
	openLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	tip: PropTypes.objectOf(PropTypes.any).isRequired,
	clickInfo: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	checkValue: PropTypes.func.isRequired,
	showPwdState: PropTypes.bool.isRequired,
	showPwdHandler: PropTypes.func.isRequired,
	checkboxHandler: PropTypes.func.isRequired,
	configSiteName: PropTypes.string.isRequired,
	tandCTerms: PropTypes.string.isRequired,
	tandCRule: PropTypes.string.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	_areaCode: PropTypes.string,
	urlAffiliate: PropTypes.bool
};

export default JoinForm;
