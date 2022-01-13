import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTime from "react-datetime";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import { GetCurrencyName, isConvert, number_format } from "../common/common";

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
	onSelectAreaCode,
	sendEmailOtp
}) => {
	const _isConvert = isConvert(userInfo.currencyId);

	const legalDate = moment().subtract(18, "year");
	const vaildDate = current => {
		return current.isBefore(legalDate);
	};
	const currencyName = GetCurrencyName({
		langId: userInfo.langId,
		currencyId: userInfo.currencyId,
		t
	});

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
							onBlur={e => valueCheck(e, "birth")}
							value={userValue.birth}
							timeFormat={false}
							dateFormat="YYYY-MM-DD"
							isValidDate={vaildDate}
							viewDate={moment(legalDate).format("YYYY-MM-DD")}
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
						className="inputBox-blue"
						onBlur={() => phoneCheck("areaCode")}
						tabIndex="0"
						role="button">
						<Dropdown
							defaultOption={areaCode}
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
						className="inputBox-blue"
						onChange={editField.bind(this, "phoneNo")}
						onBlur={e => phoneCheck("phoneNo", e.target.value)}
						value={userValue.phoneNo}
						checked={status.phoneNo.checked}
						clickInfo={clickInfo.bind(this, "phoneNo")}
						inputType="phone"
						isTipHide={true}
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
					<button
						className="icon icon-mobile btn-org"
						onClick={sendOTPSMS}>
						{t("lbl_PhoneVerification")}
						<div className="description">
							<div className="title">
								{t("lbl_PhoneVerification")}
							</div>
							<div>{t("lbl_PhoneVerificationHint1")}</div>
							<div>
								{t("lbl_PhoneVerificationHint2", {
									currency: currencyName,
									amount: number_format(
										userInfo.phoneReward ?? 0,
										_isConvert
									)
								})}
							</div>
						</div>
					</button>
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
					{userInfo.emailVerified ? (
						<span className="icon icon-Shield" />
					) : (
						<button
							className="icon icon-envelope btn-org"
							onClick={sendEmailOtp}>
							{t("lbl_EmailVerification")}
							<div className="description">
								<div className="title">
									{t("lbl_EmailVerification")}
								</div>
								<div>{t("lbl_EmailVerificationHint1")}</div>
								<div>
									{t("lbl_EmailVerificationHint2", {
										currency: currencyName,
										amount: number_format(
											userInfo.emailReward ?? 0,
											_isConvert
										)
									})}
								</div>
							</div>
						</button>
					)}
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
	sendEmailOtp: PropTypes.func.isRequired
};
