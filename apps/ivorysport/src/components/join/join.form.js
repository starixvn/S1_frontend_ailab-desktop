/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReCAPTCHA from "react-google-recaptcha";
import classNames from "classnames";
import DateTime from "react-datetime";
import Inputbox from "../common/inputbox";
import InputboxPSW from "../common/inputbox.password";
import Dropdown from "../common/dropdown";
import { reCaptchaEnum } from "./join.def";
import {
	OCCUPATION_OPTIONS,
	SOURCE_OF_INCOME_OPTIONS
} from "../common/join.data";
import FileUpload from "../common/fileUpload";

const legalDate = moment().subtract(21, "year");
const vaildDate = current => current.isBefore(legalDate);

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
		{/* {(langId === "th" || */}
		{/*	langId === "th_en" || */}
		{/*	currencyId === defCurrencyList.THB) && */}
		{/*	!lineUserId && ( */}
		{/*		<> */}
		{/*			<div className="register-line"> */}
		{/*				{t("lineRegister.lbl_RegisterWithLine")} ID */}
		{/*				<div className="btnGroup"> */}
		{/*					<button */}
		{/*						className="btn-line" */}
		{/*						onClick={e => { */}
		{/*							handleLineRegister(e); */}
		{/*						}}> */}
		{/*						<i className="icon icon-line-bold" /> */}
		{/*						{t("lineRegister.lbl_RegisterWithLine")} */}
		{/*					</button> */}
		{/*				</div> */}
		{/*			</div> */}
		{/*			<div> */}
		{/*				<span>OR</span> */}
		{/*			</div> */}
		{/*		</> */}
		{/*	)} */}
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
			<Inputbox
				className="inputBox-blue"
				icon="icon-member txt-blue"
				placeholder={t("lbl_RealName")}
				value={userValue.realName}
				tip={tip.realName.msg}
				checked={tip.realName.checked}
				clickInfo={clickInfo.bind(this, "realName")}
				onChange={EditField.bind(null, "realName")}
				onBlur={checkValue.bind(null, "realName")}
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

			{/* // * Birth Dropdown */}
			<div className="inputBox-blue">
				<DateTime
					onChange={EditField.bind(this, "birth")}
					value={userValue.birth}
					timeFormat={false}
					dateFormat="YYYY-MM-DD"
					isValidDate={vaildDate}
					viewDate={moment(legalDate).format("YYYY-MM-DD")}
					onClose={() => {
						checkValue("birth", userValue.birth);
					}}
					inputProps={{
						placeholder: t("lbl_Birthday"),
						onBlur: e => {
							checkValue("birth", e.target.value);
						}
					}}
				/>
				<div className="iconModule">
					<i className="icon icon-calendar" />
				</div>
			</div>
			<div className="tip active txt-red">{tip.birth.msg}</div>

			{/* // * Occupation Dropdown */}
			<div className="inputBox-blue">
				<Dropdown
					defaultOption={t(
						OCCUPATION_OPTIONS[userValue.occupation.index]
							.displayKey
					)}
					mainKey="join_Occupation"
					options={OCCUPATION_OPTIONS}
					selectedIdx={userValue.occupation.index}
					i18n={t}
					onSelectItem={(i, item) => {
						EditField("occupation", {
							index: i,
							value: item.value
						});
					}}
				/>
			</div>

			{/* // * Source of Income */}
			<div className="inputBox-blue">
				<Dropdown
					defaultOption={t(
						SOURCE_OF_INCOME_OPTIONS[userValue.sourceOfIncome.index]
							.displayKey
					)}
					mainKey="join_source_of_income"
					options={SOURCE_OF_INCOME_OPTIONS}
					selectedIdx={userValue.sourceOfIncome.index}
					i18n={t}
					onSelectItem={(i, item) => {
						EditField("sourceOfIncome", {
							index: i,
							value: item.value
						});
					}}
				/>
			</div>

			{/* // * Nationality */}
			<div
				className={classNames("inputBox-blue", {
					error: tip.nationality.checked === false
				})}>
				<input
					value={userValue.nationality}
					placeholder={t("lbl_Nationality")}
					onBlur={e => {
						checkValue("nationality", e);
					}}
					onChange={e => {
						EditField("nationality", e);
					}}
				/>
				<div className="iconModule" />
			</div>
			{/* // * ----- */}

			<div className="address">
				<div
					className={classNames("inputBox-blue", {
						error: tip.country.checked === false
					})}>
					<input
						value={userValue.country}
						placeholder={t("lbl_Country")}
						onBlur={e => {
							checkValue("country", e);
						}}
						onChange={e => {
							EditField("country", e);
						}}
					/>
					<div className="iconModule" />
				</div>
				<div
					className={classNames("inputBox-blue", {
						error: tip.city.checked === false
					})}>
					<input
						value={userValue.city}
						placeholder={t("lbl_City")}
						onBlur={e => {
							checkValue("city", e);
						}}
						onChange={e => {
							EditField("city", e);
						}}
					/>
					<div className="iconModule" />
				</div>

				<div className="inputBox-blue">
					<input
						placeholder={t("lbl_PostCode")}
						onChange={e => {
							EditField("postCode", e);
						}}
					/>
					<div className="iconModule" />
				</div>
			</div>
			<div className="inputBox-blue">
				<input
					placeholder={t("lbl_Line_1")}
					onChange={e => {
						EditField("lineFirst", e);
					}}
				/>
				<div className="iconModule" />
			</div>

			{/* <Inputbox */}
			{/*	className={`inputBox-blue${ */}
			{/*		tip.specialBonusCode.msg !== "" ? " error" : "" */}
			{/*	}`} */}
			{/*	icon="icon-promotion txt-blue" */}
			{/*	placeholder={t("lbl_PromoCode")} */}
			{/*	value={userValue.specialBonusCode} */}
			{/*	onChange={EditField.bind(null, "specialBonusCode")} */}
			{/*	onBlur={checkValue.bind(null, "specialBonusCode")} */}
			{/*	tip={tip.specialBonusCode.msg} */}
			{/*	checked={tip.specialBonusCode.checked} */}
			{/* /> */}
			{/* <Inputbox */}
			{/*	className="inputBox-blue" */}
			{/*	icon="icon-affiliate txt-blue" */}
			{/*	placeholder={t("lbl_Affiliate_ID")} */}
			{/*	value={hasRefOrAffCode ?? userValue.affCode} */}
			{/*	onChange={EditField.bind(null, "affCode")} */}
			{/*	readOnly={hasRefOrAffCode} */}
			{/*	checked={tip.affCode.checked} */}
			{/*	tip={tip.affCode.msg} */}
			{/*	clickInfo={clickInfo.bind(this, "affCode")} */}
			{/* /> */}
		</div>

		{/*
		{Object.keys(recaptchaInfo).length > 0 &&
			recaptchaInfo.country !== "CN" && (
				<ReCAPTCHA
					class="g-recaptcha"
					sitekey={recaptchaInfo.siteKey}
					onChange={reCaptchaOnChange}
					hl={reCaptchaEnum[langId]}
				/>
			)}
		*/}
		<div className="uploadModule id-verification">
			{/* 上傳圖片錯誤顯示以下模組，文字於下方 */}
			{/* <label class="upload_img error">
                <input type="file" />
                <i class="icon icon-plus"></i>
            </label> */}
			{/* 已上傳圖片樣式 */}
			{/*
			<label class="upload_img">
                <input type="file" />
                <img src="https://i.ibb.co/ZSb0s3B/Deposit-Slip-Template-04.jpg" alt="" />
                <i class="icon icon-close"></i>
            </label>
            */}

			{/* 錯誤訊息 */}
			{/* <div class="txt-red">File format error,please try again.</div> */}
			{/* 提醒資訊 */}
			<FileUpload EditField={EditField} checked={tip.IDImage.checked} />
			<ul className="info">
				<li className="title">{t("lbl_UploadYourIdImportant")}:</li>
				<li>1. {t("lbl_UploadYourIdHint1")}</li>
				<li>2. {t("lbl_UploadYourIdHint2")}</li>
				<li>3. {t("lbl_UploadYourIdHint3")}</li>
				<li>4. {t("lbl_UploadYourIdHint4")}</li>
				<li>5. {t("lbl_UploadYourIdHint5")}</li>
			</ul>
		</div>
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
