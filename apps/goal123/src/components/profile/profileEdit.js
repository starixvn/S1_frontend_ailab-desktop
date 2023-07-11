import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import moment from "moment";
import DateTime from "../common/dateTime";
import Inputbox from "../common/inputbox";
import { bannerImgUrl } from "../../config";

const dateTimeIcon = birth => {
	let icon;

	if (birth.checked === null) {
		icon = <i className="icon icon-calendar" />;
	} else if (birth.checked) {
		icon = <i className="icon icon-checkmark" />;
	} else if (!birth.checked) {
		icon = <i className="icon icon-cross" />;
	}

	return icon;
};

const ProfileEdit = ({
	userInfo,
	onChangeName,
	onChangeBirth,
	onChangePhone,
	onChangeEmail,
	nameValue,
	birthValue,
	phoneValue,
	emailValue,
	checkName,
	checkBirth,
	checkPhone,
	checkEmail,
	clickInfo,
	status,
	sendOTPSMS,
	mobileVerificationLoading,
	sendOTPEmail
}) => {
	const { t } = useTranslation();
	const legalDate = moment().subtract(18, "year");

	const valid = current => {
		return current.isBefore(legalDate);
	};

	let phoneVerificationIcon = null;
	if (userInfo.phoneVerified) {
		phoneVerificationIcon = (
			<img
				src={`${bannerImgUrl}/desktop/img/protection.png`}
				alt="Phone Verified"
			/>
		);
	} else if (mobileVerificationLoading) {
		phoneVerificationIcon = (
			<div className="otpLoading">
				<i className="icon icon-spinner11" />
			</div>
		);
	} else {
		phoneVerificationIcon = (
			<button onClick={sendOTPSMS}>
				<span className="icon icon-mobile" />
				<span>{t("lbl_PhoneVerification")}</span>
			</button>
		);
	}

	return (
		<div className="profile">
			<div>
				<div>{t("lbl_RealName")}</div>
				{userInfo.accountName ? (
					<div>{userInfo.accountName}</div>
				) : (
					<div className="inputModule">
						<Inputbox
							title={t("lbl_RealName")}
							onChange={onChangeName}
							value={nameValue}
							onBlur={checkName}
							clickInfo={clickInfo.bind(this, "accountName")}
							checked={status.accountName.checked}
							tip={status.accountName.tip}
						/>
					</div>
				)}
			</div>

			<div>
				<div>{t("lbl_Birthday")}</div>
				{userInfo.birth_d ? (
					<div>
						{userInfo.birth_d}/{userInfo.birth_m}/{userInfo.birth_y}
					</div>
				) : (
					<div>
						<div
							className={`inputBox${
								status.birth.checked === false ? " error" : ""
							}`}
						>
							<i className="txt-blue12">{t("lbl_Birthday")}</i>
							<DateTime
								value={birthValue}
								onChange={onChangeBirth}
								timeFormat={false}
								dateFormat="YYYY-MM-DD"
								viewDate={moment(legalDate).format(
									"YYYY-MM-DD"
								)}
								isValidDate={valid}
								viewMode="years"
								onClose={() => {
									checkBirth(birthValue);
								}}
								inputProps={{
									placeholder: "YYYY-MM-DD",
									onBlur: e => {
										checkBirth(e.target.value);
									}
								}}
							/>
							{dateTimeIcon(status.birth)}
						</div>
						{status.birth.tip && (
							<div
								className={`tip ${
									status.birth.checked ? "" : "active"
								}`}
							>
								{status.birth.tip}
							</div>
						)}
					</div>
				)}
			</div>

			<div>
				<div>{t("lbl_Phone")}</div>
				{userInfo.phoneNo ? (
					<div>
						{`(${userInfo.AreaCode})${userInfo.phoneNo}`}
						{phoneVerificationIcon}
					</div>
				) : (
					<div className="inputModule">
						<Inputbox
							title={t("lbl_Phone")}
							onChange={onChangePhone}
							value={phoneValue}
							onBlur={checkPhone}
							clickInfo={clickInfo.bind(this, "phoneNo")}
							checked={status.phoneNo.checked}
							tip={status.phoneNo.tip}
							areaCode={userInfo.AreaCode}
						/>
					</div>
				)}
			</div>

			<div>
				<div>{t("lbl_Username")}</div>
				<div>{userInfo.userName}</div>
			</div>

			<div>
				<div>{t("lbl_Email")}</div>
				{userInfo.email ? (
					<div>
						{userInfo.email}
						{userInfo.emailVerified ? (
							<img
								src={`${bannerImgUrl}/desktop/img/protection.png`}
								alt=""
							/>
						) : (
							<button onClick={sendOTPEmail}>
								<span className="icon icon-email" />
								<span>{t("lbl_EmailVerification")}</span>
							</button>
						)}
					</div>
				) : (
					<div className="inputModule">
						<Inputbox
							title={t("lbl_Email")}
							onChange={onChangeEmail}
							value={emailValue}
							onBlur={checkEmail}
							name="email"
							clickInfo={clickInfo.bind(this, "email")}
							checked={status.email.checked}
							tip={status.email.tip}
						/>
					</div>
				)}
			</div>

			<div>
				<div>{t("lbl_RegisterTime")}</div>
				<div>
					{moment(userInfo.regTime).format("DD/MM/YYYY HH:mm:ss")}
				</div>
			</div>
			<div>
				<div>{t("lbl_LastLogin")}</div>
				<div>
					{moment(userInfo.lastLogin).format("DD/MM/YYYY HH:mm:ss")}
				</div>
			</div>
		</div>
	);
};

ProfileEdit.defaultProps = {
	onChangeName: () => null,
	onChangeBirth: () => null,
	onChangePhone: () => null,
	onChangeEmail: () => null,
	nameValue: "",
	birthValue: "",
	phoneValue: "",
	emailValue: "",
	checkName: () => null,
	checkBirth: () => null,
	checkPhone: () => null,
	checkEmail: () => null,
	clickInfo: () => null,
	status: null,
	sendOTPSMS: () => null,
	mobileVerificationLoading: false,
	sendOTPEmail: () => null
};

ProfileEdit.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	onChangeName: PropTypes.func,
	onChangeBirth: PropTypes.func,
	onChangePhone: PropTypes.func,
	onChangeEmail: PropTypes.func,
	nameValue: PropTypes.string,
	birthValue: PropTypes.string,
	phoneValue: PropTypes.string,
	emailValue: PropTypes.string,
	checkName: PropTypes.func,
	checkBirth: PropTypes.func,
	checkPhone: PropTypes.func,
	checkEmail: PropTypes.func,
	clickInfo: PropTypes.func,
	status: PropTypes.objectOf(PropTypes.any),
	sendOTPSMS: PropTypes.func,
	mobileVerificationLoading: PropTypes.bool,
	sendOTPEmail: PropTypes.func
};

export default ProfileEdit;
