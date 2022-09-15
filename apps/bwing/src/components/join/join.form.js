import React from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Dropdown from "../common/dropdown";
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
	showPsw,
	showPswHandler,
	siteCurrency,
	_areaCode,
	hasRefOrAffCode,
	onSelectItem,
	clickDropdown,
	checkboxHandler,
	configSiteName,
	tandCTerms,
	tandCRule,
	clickCancel,
	clickSubmit,
	langId,
	reCaptchaOnChange
}) => {
	return (
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
					inputType={`${!showPsw ? "password" : "text"}`}
					placeholder={t("lbl_Password")}
					value={userValue.password}
					tip={tip.password.msg}
					onChange={EditField.bind(null, "password")}
					onBlur={checkValue.bind(null, "password")}
					showPsw={showPsw}
					showPswHandler={showPswHandler}
					checked={tip.password.checked}
					clickInfo={clickInfo.bind(this, "password")}
				/>
				<div className="title">{t("lbl_PrefferedCurrency")}</div>
				<div className="inputBox-blue">
					<Dropdown
						mainKey="join_currency"
						icon="icon-coin-dollar txt-blue12"
						options={siteCurrency}
						selectedIdx={userValue.currency}
						i18n={t}
						onSelectItem={onSelectItem}
						clickDropdown={clickDropdown}
					/>
				</div>

				{tip.currency.msg !== "" ? (
					<div className="tip active">{tip.currency.msg}</div>
				) : null}

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

				<div className="title">{t("lbl_Affiliates")}</div>
				<Inputbox
					icon="icon-affiliate txt-blue12"
					placeholder={t("lbl_Affiliate_ID")}
					value={hasRefOrAffCode ?? userValue.affCode}
					onChange={EditField.bind(null, "affCode")}
					readOnly={hasRefOrAffCode}
					checked={tip.affCode.checked}
					tip={tip.affCode.msg}
					clickInfo={clickInfo.bind(this, "affCode")}
				/>
			</div>

			<ReCAPTCHA
				class="g-recaptcha"
				sitekey="6LfAe2IhAAAAAF4Hrt_WLm7cu_484dw7oYhZoBE5"
				onChange={reCaptchaOnChange}
				hl={reCaptchaEnum[langId]}
			/>

			<div className="Terms">
				<Checkbox
					id="joinTermsCheck"
					checked={userValue.termsCheck}
					onChange={checkboxHandler.bind(null, "termsCheck")}>
					{t("lbl_Check18TC1")}{" "}
					<a target="_blank" rel="noreferrer" href={tandCTerms}>
						{t("lbl_TermsConditions")}{" "}
					</a>
					{t("lbl_Check18TC2")}{" "}
					<a target="_blank" rel="noreferrer" href={tandCRule}>
						{t("lbl_RuleRegulations")}{" "}
					</a>
					{t("lbl_Check18TC3")} {configSiteName}.
				</Checkbox>

				<Checkbox
					id="joinAgeCheck"
					checked={userValue.ageCheck}
					onChange={checkboxHandler.bind(null, "ageCheck")}>
					{t("lbl_Check18TC4")}
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
};

JoinForm.defaultProps = {
	hasRefOrAffCode: null,
	_areaCode: null,
	langId: null,
	reCaptchaOnChange: null
};

JoinForm.propTypes = {
	t: PropTypes.func.isRequired,
	openLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	tip: PropTypes.objectOf(PropTypes.any).isRequired,
	clickInfo: PropTypes.func.isRequired,
	EditField: PropTypes.func.isRequired,
	checkValue: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	showPswHandler: PropTypes.func.isRequired,
	siteCurrency: PropTypes.arrayOf(PropTypes.any).isRequired,
	_areaCode: PropTypes.string,
	hasRefOrAffCode: PropTypes.string,
	onSelectItem: PropTypes.func.isRequired,
	clickDropdown: PropTypes.func.isRequired,
	checkboxHandler: PropTypes.func.isRequired,
	configSiteName: PropTypes.string.isRequired,
	tandCTerms: PropTypes.string.isRequired,
	tandCRule: PropTypes.string.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	langId: PropTypes.string,
	reCaptchaOnChange: PropTypes.func
};

export default JoinForm;
