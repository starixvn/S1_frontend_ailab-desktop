import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTime from "../common/dateTime";
import Inputbox from "../common/inputbox";
import verifiedImg from "../../styles/img/shieldimg.png";
import { number_format } from "../common/common";

const dateTimeIcon = birth => {
	let icon;

	if (birth.checked === null) {
		icon = <i className="icon icon-calendar" />;
	} else if (birth.checked) {
		icon = <i className="icon icon-checkmark" />;
	} else {
		icon = <i className="icon icon-cross" />;
	}

	return icon;
};

const ProfileEdit = ({
	t,
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
	sendEmailOtp
}) => {
	const legalDate = moment().subtract(18, "year");
	const valid = current => {
		return current.isBefore(legalDate);
	};

	let phoneVerificationIcon = null;
	if (userInfo.phoneVerified) {
		phoneVerificationIcon = (
			<button className="shield">
				<img src={verifiedImg} alt="Phone Verified" />
			</button>
		);
	} else if (mobileVerificationLoading) {
		phoneVerificationIcon = <div className="icon icon-spinner11" />;
	} else {
		phoneVerificationIcon = (
			<button className="notVer" onClick={sendOTPSMS}>
				<span>{t("lbl_Unverified")}</span>
				<span className="icon icon-error" />
				<div className="hint">
					<span>{t("lbl_PhoneVerification")}</span>
					{t("lbl_PhoneVerificationHint", {
						amount: number_format({
							number: userInfo.phoneReward ?? 0
						})
					})}
				</div>
			</button>
		);
	}

	return (
		<div className="profile">
			<div>
				<div className="title">{t("lbl_RealName")}</div>
				{userInfo.accountName ? (
					<div>{userInfo.accountName}</div>
				) : (
					<div className="inputModule">
						<Inputbox
							placeholder={t("lbl_RealName")}
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
				<div className="title">{t("lbl_Birthday")}</div>
				{userInfo.birth_d ? (
					<div>
						{userInfo.birth_d}/{userInfo.birth_m}/{userInfo.birth_y}
					</div>
				) : (
					<div className="inputModule">
						<div className="inputBox-blue">
							<DateTime
								placeholder={t("lbl_Birthday")}
								value={birthValue}
								onChange={onChangeBirth}
								timeFormat={false}
								dateFormat="YYYY-MM-DD"
								onBlur={checkBirth}
								viewDate={moment(legalDate).format(
									"YYYY-MM-DD"
								)}
								isValidDate={valid}
								viewMode="years"
							/>
							<div className="iconModule">
								{dateTimeIcon(status.birth)}
							</div>
						</div>

						<div
							className={`tip ${
								status.birth.checked ? "" : "active"
							}`}>
							{status.birth.tip}
						</div>
					</div>
				)}
			</div>

			<div>
				<div className="title">{t("lbl_Username")}</div>
				<div>{userInfo.userName}</div>
			</div>

			<div>
				<div className="title">{t("lbl_Phone")}</div>
				{userInfo.phoneNo ? (
					<>
						<div>{`(${userInfo.AreaCode})${userInfo.phoneNo}`}</div>
						{phoneVerificationIcon}
					</>
				) : (
					<div className="inputModule">
						<Inputbox
							placeholder={t("lbl_Phone")}
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
				<div className="title">{t("lbl_Email")}</div>
				{userInfo.email ? (
					<>
						<div>{userInfo.email}</div>
						{userInfo.emailVerified ? (
							<button className="shield">
								<img src={verifiedImg} alt="Phone Verified" />
							</button>
						) : (
							<button className="notVer" onClick={sendEmailOtp}>
								<span>{t("lbl_Unverified")}</span>
								<span className="icon icon-error" />
								<div className="hint">
									<span>{t("lbl_EmailVerification")}</span>
									{t("lbl_EmailVerificationHint", {
										amount: number_format({
											number: userInfo.emailReward ?? 0
										})
									})}
								</div>
							</button>
						)}
					</>
				) : (
					<div className="inputModule">
						<Inputbox
							placeholder={t("lbl_Email")}
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
				<div className="title">{t("lbl_RegisterTime")}</div>
				<div>
					{moment(userInfo.regTime).format("DD/MM/YYYY HH:mm:ss")}
				</div>
			</div>
			<div>
				<div className="title">{t("lbl_LastLogin")}</div>
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
	nameValue: null,
	birthValue: null,
	phoneValue: null,
	emailValue: null,
	checkName: () => null,
	checkBirth: () => null,
	checkPhone: () => null,
	checkEmail: () => null,
	clickInfo: () => null,
	status: {},
	sendOTPSMS: () => null,
	mobileVerificationLoading: false,
	sendEmailOtp: () => null
};

ProfileEdit.propTypes = {
	t: PropTypes.func.isRequired,
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
	status: PropTypes.objectOf(PropTypes.object),
	sendOTPSMS: PropTypes.func,
	mobileVerificationLoading: PropTypes.bool,
	sendEmailOtp: PropTypes.func
};

export default ProfileEdit;
