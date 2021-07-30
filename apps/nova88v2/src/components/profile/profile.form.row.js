import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import DateTime from "react-datetime";
import { userInfoContext } from "../common/context";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown";

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
	onSelectAreaCode
}) => {
	const {
		userInfo: { phoneVerified }
	} = useContext(userInfoContext);

	const legalDate = moment().subtract(21, "year");
	const vaildDate = current => {
		return current.isBefore(legalDate);
	};

	if (displayKey === "lbl_RealName" && !userInfo?.accountName) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div>
					<Inputbox
						className="inputBox-white"
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
					<div className="inputBox-white">
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

	if (displayKey === "lbl_Phone" && !userInfo?.phoneNo) {
		return (
			<div>
				<div>{t(displayKey)}</div>
				<div className="phone">
					<div
						className="inputBox-white"
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
						className="inputBox-white"
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
			</div>
		);
	}

	return (
		<div>
			<div>{t(displayKey)}</div>
			<div>
				{displayKey === "lbl_Phone"
					? `(${areaCode})${content}`
					: content}

				{displayKey === "lbl_Phone" ? (
					mobileVerificationLoading ? (
						<div className="otpLoading">
							<i className="icon icon-spinner11" />
						</div>
					) : phoneVerified ? (
						<span className="icon icon-checkmark" />
					) : (
						<button onClick={sendOTPSMS}>
							<span className="icon icon-error otp" />
							<span>{t("lbl_MobileVerify")}</span>
						</button>
					)
				) : null}
			</div>
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
	onSelectAreaCode: PropTypes.func.isRequired
};
