/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Dropdown from "../common/dropdown";
import { defCurrencyList } from "../common/common";
import { reCaptchaEnum } from "./join.def";

const JoinForm = ({
	t,
	openLogin,
	userValue,
	tip,
	setTip,
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
	handleLineRegister,
	langId,
	currencyId,
	lineUserId,
	areaCodeList,
	reCaptchaOnChange,
	recaptchaInfo
}) => (
	<form className="joinloginFunction" onSubmit={clickSubmit}>
		<span className="title txt-blue">{t("lbl_JoinNow")}</span>
		<div>
			{t("lbl_LoginMsg")}
			<button className="txt-blue" type="button" onClick={openLogin}>
				{t("lbl_LoginHere")}
			</button>
		</div>
		{(langId === "th" ||
			langId === "th_en" ||
			currencyId === defCurrencyList.THB) &&
			!lineUserId && (
				<>
					<div className="register-line">
						{t("lineRegister.lbl_RegisterWithLine")} ID
						<div className="btnGroup">
							<button
								className="btn-line"
								onClick={e => {
									handleLineRegister(e);
								}}>
								<i className="icon icon-line-bold" />
								{t("lineRegister.lbl_RegisterWithLine")}
							</button>
						</div>
					</div>
					<div>
						<span>OR</span>
					</div>
				</>
			)}
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
				}`}>
				<Dropdown
					defaultOption={defaultOption}
					mainKey="join_currency"
					icon="icon-coin-dollar txt-blue"
					options={siteCurrency}
					selectedIdx={userValue.currencyIdx}
					i18n={t}
					onSelectItem={i =>
						onSelectItem({ idx: i, col: "currencyIdx" })
					}
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
						}`}>
						<AreaCodeDropdown
							defaultOption={_areaCode}
							options={areaCodeList}
							selectedIdx={userValue.areaCodeIdx}
							onSelectItem={(i, item) =>
								onSelectItem({
									idx: i,
									col: "areaCodeIdx",
									item
								})
							}
						/>
					</div>

					<Inputbox
						className={`inputBox-blue${
							!tip.phone.checked && tip.phone.msg !== ""
								? " error"
								: ""
						}`}
						placeholder={t("lbl_Phone")}
						value={userValue.phone}
						tip={tip.phone.msg}
						checked={tip.phone.checked}
						isTipHide={true}
						clickInfo={clickInfo.bind(this, "phone")}
						onChange={EditField.bind(null, "phone")}
						// * 清空錯誤訊息， phone 改為按下 submit 之後才打 api 驗證
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

		{Object.keys(recaptchaInfo).length > 0 &&
			recaptchaInfo.country !== "CN" && (
				<ReCAPTCHA
					class="g-recaptcha"
					sitekey={recaptchaInfo.siteKey}
					onChange={reCaptchaOnChange}
					hl={reCaptchaEnum[langId]}
				/>
			)}

		<div className="Terms">
			{t("lbl_sign_up_terms_start")}
			<a
				className="txt-blue"
				target="_blank"
				rel="noreferrer"
				href={tandCTerms}>
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
	defaultOption: null,
	langId: "en",
	currencyId: null,
	lineUserId: "",
	reCaptchaOnChange: null,
	recaptchaInfo: null
};

JoinForm.propTypes = {
	t: PropTypes.func.isRequired,
	openLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	tip: PropTypes.objectOf(PropTypes.any).isRequired,
	setTip: PropTypes.func.isRequired,
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
	handleLineRegister: PropTypes.func.isRequired,
	langId: PropTypes.string,
	currencyId: PropTypes.number,
	lineUserId: PropTypes.string,
	areaCodeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	reCaptchaOnChange: PropTypes.func,
	recaptchaInfo: PropTypes.objectOf(PropTypes.any)
};

export const AreaCodeDropdown = ({
	defaultOption,
	options,
	selectedIdx,
	onSelectItem,
	disabled
}) => {
	const [isOpen, setOpen] = useState(false);
	const [filterData, setFilterData] = useState({ input: "" });
	const wrapper = useRef(null);

	const useClickOutside = ref => {
		useEffect(() => {
			const handleClickOutside = e => {
				if (
					ref.current &&
					!ref.current.contains(e.target) &&
					e.target.className !== "search"
				) {
					setOpen(false);
				}
			};
			document.addEventListener("mousedown", handleClickOutside);

			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	};

	const clickDropdown = e => {
		e.preventDefault();

		if (disabled) return;

		if (e.target.className !== "search") {
			setOpen(prev => !prev);
		}
	};
	useClickOutside(wrapper);

	const selectItem = (e, { idx, item }) => {
		e.stopPropagation();
		setOpen(false);
		onSelectItem(idx, item);
	};

	const search = e => {
		const val = e.target.value;
		const filteredOptions = options.filter(el =>
			el.displayText.toLowerCase().includes(val.toLowerCase())
		);
		setFilterData(prev => ({ ...prev, input: val, filteredOptions }));
	};
	const _options = filterData?.filteredOptions ?? options;

	const arr = _options.map((item, i) => (
		<div
			key={`item-${item.displayText}`}
			className="dropdown-item"
			onClick={e => selectItem(e, { idx: i, item })}>
			{item.displayText}
		</div>
	));

	const selected = _options[selectedIdx]?.displayText;

	return (
		<div className="dropdown" ref={wrapper} onClick={clickDropdown}>
			<i className="icon icon-phone txt-blue" />
			<button className="btn">{defaultOption ?? selected}</button>
			<div className={`dropdown-container${isOpen ? " active" : ""}`}>
				<div className="inputBox-blue">
					<input
						type="text"
						className="search"
						placeholder="Search"
						onChange={search}
						value={filterData?.input}
					/>
				</div>
				{arr}
			</div>
		</div>
	);
};

AreaCodeDropdown.defaultProps = {
	defaultOption: null,
	options: null,
	selectedIdx: null,
	onSelectItem: () => null,
	disabled: null
};

AreaCodeDropdown.propTypes = {
	defaultOption: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.object),
	selectedIdx: PropTypes.number,
	onSelectItem: PropTypes.func,
	disabled: PropTypes.bool
};

export default JoinForm;
