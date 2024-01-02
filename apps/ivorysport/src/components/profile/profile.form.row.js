import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTime from "react-datetime";
import Inputbox from "../common/inputbox";
import { AreaCodeDropdown } from "../join/join.form";
import { areaCodeList } from "../join/join";
import Dropdown from "../common/dropdown";
import { getOccupationOptions, getIncomeSourceOptions } from "./profile.data";

const DisplayRow = ({
	t,
	displayKey,
	content,
	areaCode,
	mobileVerificationLoading,
	sendOTPSMS,
	userInfo,
	userValue,
	status,
	editField,
	valueCheck,
	phoneCheck,
	clickInfo,
	isUSDT,
	areaCodeOptions,
	onSelectOccupation,
	onSelectSourceOfIncome,
	onSelectAreaCode,
	sendEmailOtp
}) => {
	const _areaCode = areaCodeList[userValue?.areaCodeIdx]?.areaCode;
	const legalDate = moment().subtract(21, "year");
	const vaildDate = current => current.isBefore(legalDate);
	const occupationOptions = getOccupationOptions(t);
	const incomeSourceOptions = getIncomeSourceOptions(t);

	// * 如果生日已填寫且 occupation 和 sourceOfIncome 視為舊用戶(setProfile已送出過)
	const isNewUser =
		!userInfo.birth_d &&
		(userInfo.occupation === 0 || userInfo.sourceOfIncome === 0);

	if (displayKey === "lbl_RealName" && !userInfo?.accountName) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div>
					<Inputbox
						className="inputBox-blue"
						onChange={editField.bind(this, "accountName")}
						onBlur={e => valueCheck(e.target.value, "accountName")}
						value={userValue.accountName}
						checked={status.accountName.checked}
						clickInfo={clickInfo.bind(this, "accountName")}
						tooltip={t("lbl_RemindForName")}
					/>
					{status.accountName.tip ? (
						<div className="tip active txt-red">
							{status.accountName.tip}
						</div>
					) : null}
				</div>
			</div>
		);
	}
	if (
		displayKey === "lbl_Birthday" &&
		(!userInfo?.birth_d || !userInfo?.birth_m || !userInfo?.birth_y)
	) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div>
					<div className="inputBox-blue">
						<DateTime
							onChange={editField.bind(this, "birth")}
							value={userValue.birth}
							timeFormat={false}
							dateFormat="YYYY-MM-DD"
							isValidDate={vaildDate}
							viewDate={moment(legalDate).format("YYYY-MM-DD")}
							onClose={() => valueCheck(userValue.birth, "birth")}
							inputProps={{
								placeholder: "YYYY-MM-DD",
								onBlur: e => valueCheck(e.target.value, "birth")
							}}
						/>
						<div className="iconModule">
							<i className="icon icon-calendar" />
						</div>
					</div>

					{status.birth.tip ? (
						<div className="tip active txt-red">
							{status.birth.tip}
						</div>
					) : null}
				</div>
			</div>
		);
	}
	if (displayKey === "lbl_Phone") {
		let phoneContent = null;

		if (!userInfo?.phoneNo) {
			phoneContent = (
				<div className="phone">
					<div
						className={`inputBox-blue${
							status.phoneNo.checked === false ? " error" : ""
						}`}>
						<AreaCodeDropdown
							defaultOption={_areaCode}
							options={areaCodeList}
							selectedIdx={userValue.areaCodeIdx}
							onSelectItem={onSelectAreaCode}
						/>
					</div>

					<Inputbox
						className={`inputBox-blue${
							status.phoneNo.checked === false ? " error" : ""
						}`}
						placeholder={t("lbl_Phone")}
						value={userValue.phoneNo}
						checked={status.phoneNo.checked}
						isTipHide={true}
						clickInfo={clickInfo.bind(this, "phoneNo")}
						onChange={editField.bind(this, "phoneNo")}
						onBlur={e => phoneCheck("phoneNo", e.target.value)}
						inputType="phone"
					/>
					{status.phoneNo.tip ? (
						<div className="tip active txt-red">
							{status.phoneNo.tip}
						</div>
					) : null}
				</div>
			);
		} else if (mobileVerificationLoading) {
			phoneContent = (
				<div>
					{`(${areaCode})${content}`}
					<div className="otpLoading">
						<i className="icon icon-spinner11" />
					</div>
				</div>
			);
		} else if (userInfo.phoneVerified) {
			phoneContent = (
				<div>
					{`(${areaCode})${content}`}
					<span className="icon icon-Shield" />
				</div>
			);
		} else {
			phoneContent = (
				<div>
					{`(${areaCode})${content}`}
					{/* <button */}
					{/*	className="icon icon-mobile btn-org" */}
					{/*	onClick={sendOTPSMS}> */}
					{/*	{t("lbl_PhoneVerification")} */}
					{/*	<div className="description"> */}
					{/*		<div className="title"> */}
					{/*			{t("lbl_PhoneVerification")} */}
					{/*		</div> */}
					{/*		<div>{t("lbl_PhoneVerificationHint1")}</div> */}
					{/*		<div> */}
					{/*			{t("lbl_PhoneVerificationHint2", { */}
					{/*				currency: currencyName, */}
					{/*				amount: number_format( */}
					{/*					userInfo.phoneReward ?? 0, */}
					{/*					_isConvert */}
					{/*				) */}
					{/*			})} */}
					{/*		</div> */}
					{/*	</div> */}
					{/* </button> */}
				</div>
			);
		}

		return (
			<div>
				<div>{t(displayKey)}</div>
				{phoneContent}
			</div>
		);
	}

	if (displayKey === "lbl_Email") {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div>
					{content}
					{/* {userInfo.emailVerified ? ( */}
					{/*	<span className="icon icon-Shield" /> */}
					{/* ) : ( */}
					{/*	<button */}
					{/*		className="icon icon-envelope btn-org" */}
					{/*		onClick={sendEmailOtp} */}
					{/*	> */}
					{/*		{t("lbl_EmailVerification")} */}
					{/*		<div className="description"> */}
					{/*			<div className="title"> */}
					{/*				{t("lbl_EmailVerification")} */}
					{/*			</div> */}
					{/*			<div>{t("lbl_EmailVerificationHint1")}</div> */}
					{/*			<div> */}
					{/*				{t("lbl_EmailVerificationHint2", { */}
					{/*					currency: currencyName, */}
					{/*					amount: number_format( */}
					{/*						userInfo.emailReward ?? 0, */}
					{/*						_isConvert */}
					{/*					) */}
					{/*				})} */}
					{/*			</div> */}
					{/*		</div> */}
					{/*	</button> */}
					{/* )} */}
				</div>
			</div>
		);
	}

	// * 新用戶才給予下拉選單
	if (displayKey === "lbl_Occupation" && isNewUser) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div className="inputBox-blue">
					<Dropdown
						defaultOption={
							userValue.occupation ? null : t("lbl_PleaseChoose")
						}
						i18n={t}
						options={occupationOptions}
						onSelectItem={onSelectOccupation}
						selectedIdx={userValue.occupation - 1}
						mainKey="occupation"
					/>
				</div>
			</div>
		);
	}

	// * 新用戶才給予下拉選單
	if (displayKey === "lbl_SourceOfIncome" && isNewUser) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div className="inputBox-blue">
					<Dropdown
						defaultOption={
							userValue.sourceOfIncome
								? null
								: t("lbl_PleaseChoose")
						}
						i18n={t}
						options={incomeSourceOptions}
						onSelectItem={onSelectSourceOfIncome}
						selectedIdx={userValue.sourceOfIncome - 1}
						mainKey="sourceOfIncome"
					/>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div>{t(displayKey)}</div>
			<div>{content}</div>
		</div>
	);
};

export default DisplayRow;

DisplayRow.defaultProps = {
	content: null
};

DisplayRow.propTypes = {
	t: PropTypes.func.isRequired,
	displayKey: PropTypes.string.isRequired,
	content: PropTypes.string,
	areaCode: PropTypes.string.isRequired,
	mobileVerificationLoading: PropTypes.bool.isRequired,
	sendOTPSMS: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	editField: PropTypes.func.isRequired,
	valueCheck: PropTypes.func.isRequired,
	phoneCheck: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	isUSDT: PropTypes.bool.isRequired,
	areaCodeOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	onSelectAreaCode: PropTypes.func.isRequired,
	onSelectOccupation: PropTypes.func.isRequired,
	onSelectSourceOfIncome: PropTypes.func.isRequired,
	sendEmailOtp: PropTypes.func.isRequired
};
