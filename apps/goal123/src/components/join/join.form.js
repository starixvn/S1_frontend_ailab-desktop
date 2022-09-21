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
				<div className="inputBox">
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
				{/* <Inputbox
						icon="icon-promotion txt-blue12"
						placeholder={t("lbl_PromoCode")}
						value={userValue.specialBonusCode}
						onChange={EditField.bind(null, "specialBonusCode")}
						onBlur={checkValue.bind(null, "specialBonusCode")}
						tip={tip.specialBonusCode.msg}
						checked={tip.specialBonusCode.checked}
						clickInfo={clickInfo.bind(this, "specialBonusCode")}
					/> */}
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
				{tip.currency.msg !== "" ? (
					<div className="tip active">{tip.currency.msg}</div>
				) : null}
			</div>

			<ReCAPTCHA
				class="g-recaptcha"
				sitekey="6LfhmRciAAAAAFSX-wXBxMISia2lpS5_SQ7aa7-E"
				onChange={reCaptchaOnChange}
				hl={reCaptchaEnum[langId]}
			/>

			<div className="Terms">
				<Checkbox
					id="joinTermsCheck"
					checked={userValue.termsCheck}
					onChange={checkboxHandler.bind(null, "termsCheck")}>
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
				<button
					type="button"
					className="btn-cancel"
					onClick={clickCancel}>
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
	hasRefOrAffCode: null,
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
