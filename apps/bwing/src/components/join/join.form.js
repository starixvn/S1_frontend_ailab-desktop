import React from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Checkbox from "../common/checkbox";
import { reCaptchaEnum } from "./join.def";

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
	_areaCode,
	checkboxHandler,
	configSiteName,
	tandCTerms,
	tandCRule,
	clickCancel,
	clickSubmit,
	langId,
	reCaptchaOnChange,
	urlAffiliate
}) => (
	<div className="joinModule" onSubmit={clickSubmit}>
		<div className="title">{t("lbl_JoinNow")}</div>
		<div>
			{t("lbl_LoginMsg")}
			<button className="txt-blue2" type="button" onClick={openLogin}>
				{t("lbl_LoginHere")}
			</button>
		</div>

		<div className="inputModule">
			<div className="title">{t("lbl_Username")}</div>
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
			<div className="title">{t("lbl_Password")}</div>
			<InputboxPSW
				icon="icon-key txt-blue12"
				inputType={`${!showPwdState.password ? "password" : "text"}`}
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
			<div className="title">{t("lbl_ConfirmPassword")}</div>
			<InputboxPSW
				icon="icon-key txt-blue12"
				inputType={`${!showPwdState.confirmPwd ? "password" : "text"}`}
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
			<div className="title">{t("lbl_RealName")}</div>
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
			<div className="title">{t("lbl_Phone")}</div>
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
			<div className="title">{t("lbl_Email")}</div>
			<Inputbox
				icon="icon-email txt-blue12"
				placeholder={t("lbl_Email")}
				value={userValue.email}
				tip={tip.email.msg}
				checked={tip.email.checked}
				clickInfo={clickInfo.bind(this, "email")}
				onChange={EditField.bind(null, "email")}
				onBlur={checkValue.bind(null, "email")}
			/>
			<div className="title">{t("lbl_Affiliates")}</div>
			<Inputbox
				icon="icon-affiliate txt-blue12"
				placeholder={t("lbl_Affiliate_ID")}
				value={userValue.affiliate}
				onChange={EditField.bind(null, "affiliate")}
				onBlur={checkValue.bind(null, "affiliate")}
				readOnly={urlAffiliate && userValue.affiliate}
				checked={tip.affiliate.checked}
				tip={tip.affiliate.msg}
				clickInfo={clickInfo.bind(this, "affiliate")}
			/>
		</div>

		<ReCAPTCHA
			class="g-recaptcha"
			sitekey="6LdzkRciAAAAAMuli_1oYaulJv-LHcT0wNZtaK69"
			onChange={reCaptchaOnChange}
			hl={reCaptchaEnum[langId]}
		/>
		<div className="Terms">
			<Checkbox
				id="joinAgreeCheck"
				checked={userValue.agreeCheck}
				onChange={checkboxHandler.bind(null, "agreeCheck")}
			>
				{t("lbl_Check18TC1")}{" "}
				<a target="_blank" rel="noreferrer" href={tandCTerms}>
					{t("lbl_TermsConditions")}{" "}
				</a>
				{t("lbl_Check18TC2")}{" "}
				<a target="_blank" rel="noreferrer" href={tandCRule}>
					{t("lbl_RuleRegulations")}{" "}
				</a>
				{t("lbl_Check18TC3")} {configSiteName}. {t("lbl_Check18TC4")}
			</Checkbox>
		</div>
		{tip.checkbox.msg !== "" ? (
			<div className="tip active">{tip.checkbox.msg}</div>
		) : null}
		<div className="btnGroup">
			<button type="button" className="gray" onClick={clickCancel}>
				{t("lbl_CANCEL")}
			</button>
			<button className="orange" type="submit" onClick={clickSubmit}>
				{String(t("lbl_JoinNow")).toUpperCase()}
			</button>
		</div>
	</div>
);

JoinForm.defaultProps = {
	_areaCode: null,
	langId: null,
	reCaptchaOnChange: null,
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
	showPwdState: PropTypes.objectOf(PropTypes.any).isRequired,
	showPwdHandler: PropTypes.func.isRequired,
	_areaCode: PropTypes.string,
	checkboxHandler: PropTypes.func.isRequired,
	configSiteName: PropTypes.string.isRequired,
	tandCTerms: PropTypes.string.isRequired,
	tandCRule: PropTypes.string.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	langId: PropTypes.string,
	reCaptchaOnChange: PropTypes.func,
	urlAffiliate: PropTypes.bool
};

export default JoinForm;
