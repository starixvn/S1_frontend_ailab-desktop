import React from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Dropdown from "../common/dropdown";

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
	tandCTerms,
	clickCancel,
	clickSubmit,
	defaultOption,
	areaCodeOptions,
	onSelectAreaCode,
	isUSDT
}) => (
	<form className="joinloginFunction" onSubmit={clickSubmit}>
		<span className="title txt-blue">{t("lbl_JoinNow")}</span>
		<div>
			{t("lbl_LoginMsg")}
			<button className="txt-blue" type="button" onClick={openLogin}>
				{t("lbl_LoginHere")}
			</button>
		</div>
		<div className="inputModule">
			<Inputbox
				className="inputBox-blue"
				icon="icon-member txt-blue"
				placeholder={t("lbl_Username")}
				value={userValue.username}
				tip={tip.username.msg}
				checked={tip.username.checked}
				clickInfo={clickInfo.bind(this, "username")}
				onChange={EditField.bind(null, "username")}
				onBlur={checkValue.bind(null, "username")}
			/>
			<InputboxPSW
				className={`inputBox-blue${
					!tip.password.checked && tip.password.msg !== ""
						? " error"
						: ""
				}`}
				icon="icon-key txt-blue"
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
			<Inputbox
				className="inputBox-blue"
				icon="icon-email txt-blue"
				placeholder={t("lbl_Email")}
				value={userValue.email}
				tip={tip.email.msg}
				checked={tip.email.checked}
				clickInfo={clickInfo.bind(this, "email")}
				onChange={EditField.bind(null, "email")}
				onBlur={checkValue.bind(null, "email")}
			/>
			<div
				className={`inputBox-blue${
					tip.currency.msg !== "" ? " error" : ""
				}`}
			>
				<Dropdown
					defaultOption={defaultOption}
					mainKey="join_currency"
					icon="icon-coin-dollar txt-blue"
					options={siteCurrency}
					selectedIdx={userValue.currencyIdx}
					i18n={t}
					onSelectItem={onSelectItem}
					onBlur={checkValue.bind(null, "currency")}
					flag={true}
				/>
			</div>
			{tip.currency.msg ? (
				<div className="tip active">{tip.currency.msg}</div>
			) : (
				<div className="tip active">
					{t("lbl_CantChangePreferredCurrency")}
				</div>
			)}

			{userValue.currencyIdx !== null ? (
				<div className="phone">
					<div
						className={`inputBox-blue${
							!tip.phone.checked && tip.phone.msg !== ""
								? " error"
								: ""
						}`}
					>
						<Dropdown
							defaultOption={_areaCode}
							mainKey="area_code"
							icon="icon-phone txt-blue"
							options={areaCodeOptions}
							selectedIdx={userValue.areaCodeIdx}
							i18n={t}
							onSelectItem={onSelectAreaCode}
							disabled={!isUSDT}
						/>
					</div>

					<Inputbox
						className={`inputBox-blue${
							!tip.phone.checked && tip.phone.msg !== ""
								? " error"
								: ""
						}`}
						// areaCode={_areaCode}
						placeholder={t("lbl_Phone")}
						value={userValue.phone}
						tip={tip.phone.msg}
						checked={tip.phone.checked}
						isTipHide={true}
						clickInfo={clickInfo.bind(this, "phone")}
						onChange={EditField.bind(null, "phone")}
						onBlur={checkValue.bind(null, "phone")}
						inputType="phone"
					/>
				</div>
			) : null}

			{userValue.currencyIdx !== null &&
				(tip.phone.msg ? (
					<div className="tip active txt-red">{tip.phone.msg}</div>
				) : (
					<div className="tip active">{t("lbl_CantChangePhone")}</div>
				))}

			<Inputbox
				className={`inputBox-blue${
					tip.specialBonusCode.msg !== "" ? " error" : ""
				}`}
				icon="icon-promotion txt-blue"
				placeholder={t("lbl_PromoCode")}
				value={userValue.specialBonusCode}
				onChange={EditField.bind(null, "specialBonusCode")}
				onBlur={checkValue.bind(null, "specialBonusCode")}
				tip={tip.specialBonusCode.msg}
				checked={tip.specialBonusCode.checked}
			/>
			<Inputbox
				className="inputBox-blue"
				icon="icon-affiliate txt-blue"
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
			{t("lbl_sign_up_terms_start")}
			<a
				className="txt-blue"
				target="_blank"
				rel="noreferrer"
				href={tandCTerms}
			>
				{t("lbl_sign_up_terms_center")}
			</a>
			{t("lbl_sign_up_terms_end")}
		</div>

		<div className="btnGroup">
			<button type="button" className="btn-cancel" onClick={clickCancel}>
				{t("lbl_Cancel")}
			</button>
			<button className="btn-check" type="submit">
				{t("lbl_Submit")}
			</button>
		</div>
	</form>
);

JoinForm.defaultProps = {
	hasRefOrAffCode: null,
	_areaCode: null,
	defaultOption: null
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
	tandCTerms: PropTypes.string.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	defaultOption: PropTypes.string,
	areaCodeOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	onSelectAreaCode: PropTypes.func.isRequired,
	isUSDT: PropTypes.bool.isRequired
};

export default JoinForm;
