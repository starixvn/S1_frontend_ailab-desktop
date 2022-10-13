import React from "react";
import PropTypes from "prop-types";
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
	showPsw,
	showPswHandler,
	_areaCode,
	hasRefOrAffCode,
	checkboxHandler,
	configSiteName,
	tandCTerms,
	tandCRule,
	clickCancel,
	clickSubmit
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

			<div className="Terms">
				<Checkbox
					id="joinAgreeCheck"
					checked={userValue.agreeCheck}
					onChange={checkboxHandler.bind(null, "agreeCheck")}>
					{t("lbl_Check18TC1")}{" "}
					<a target="_blank" rel="noreferrer" href={tandCTerms}>
						{t("lbl_TermsConditions")}{" "}
					</a>
					{t("lbl_Check18TC2")}{" "}
					<a target="_blank" rel="noreferrer" href={tandCRule}>
						{t("lbl_RuleRegulations")}{" "}
					</a>
					{t("lbl_Check18TC3")} {configSiteName}.{" "}
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
	_areaCode: null
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
	_areaCode: PropTypes.string,
	hasRefOrAffCode: PropTypes.string,
	checkboxHandler: PropTypes.func.isRequired,
	configSiteName: PropTypes.string.isRequired,
	tandCTerms: PropTypes.string.isRequired,
	tandCRule: PropTypes.string.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired
};

export default JoinForm;
