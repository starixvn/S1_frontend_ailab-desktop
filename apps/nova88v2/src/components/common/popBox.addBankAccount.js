import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext, userInfoContext } from "./context";
import defPopBoxType from "./defPopBoxType";
import usePopBox from "../hook/usePopBox";
import { cloudImgUrl } from "../../config";
import Dropdown from "./dropdown";
import Inputbox from "./inputbox";
import { currencyCode } from "../../datas/countryCode";

const initValue = {
	realName: "",
	bankId: 0,
	accountNo: "",
	ifscCode: ""
};

export default ({ bankInfoSysList = [], custBankInfo, GetCustBankInfo }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	const [status, setStatus] = useState({
		realName: {
			checked: null,
			tip: ""
		},
		accountNo: {
			checked: null,
			tip: ""
		},
		realName_after: {
			tip: ""
		},
		ifscCode: {
			checked: null,
			tip: ""
		}
	});
	const isMountedRef = useRef(null);
	const isIfscRequired = userInfo.currencyId === currencyCode.INR;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onSelectItem = i => {
		setUserValue(prev => ({ ...prev, bankId: i }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false, refresh: true });
	};

	const clickInfo = col => {
		let _tip = "";

		if (col === "realName") {
			_tip = t("lbl_BankAccountNameHint");
		} else if (col === "ifscCode") {
			_tip = t("msg_PleaseEnterIFSCCode");
		} else if (col === "realName_after") {
			_tip = t("lbl_BankAccountHint");
		} else {
			_tip = t("lbl_BankNumber");
		}

		if (status[col].tip === _tip) {
			_tip = "";
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: status[col].checked,
				tip: _tip
			}
		}));
	};

	const editField = (col, e) => {
		let val = e.target.value;
		val =
			col === "accountNo"
				? val.replace(/[^\d]+/g, "")
				: val.replace(/[\W]/g, "");
		setUserValue(prev => ({ ...prev, [col]: val }));
	};

	const checkAll = (val, col) => {
		let checked = true;
		let message = "";
		const isRepeatAccount =
			custBankInfo.bankInfoDetail?.filter(
				_selectBank =>
					_selectBank.bankName ===
						bankInfoSysList[userValue.bankId].displayText &&
					_selectBank.accountNo === val
			).length > 0;

		const alreadyHasAccountName =
			userInfo.accountName !== null && userInfo.accountName !== "";

		if (col === "realName" && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (col === "accountNo") {
			if (!val) {
				message = t("msg_NeedAccountNo");
				checked = false;
			} else if (isRepeatAccount) {
				message = t("lbl_already_stored_this_information");
				checked = false;
			}
		} else if (col === "ifscCode" && isIfscRequired) {
			if (!val) {
				message = t("msg_PleaseEnterIFSCCode");
				checked = false;
			} else if (val?.length !== 11) {
				message = t("msg_IFSCCodeLength");
				checked = false;
			}
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked,
				tip: message
			}
		}));

		if (bankInfoSysList?.length <= 0) {
			checked = false;
		}

		return { checked, message };
	};

	const ClickSubmit = e => {
		e.preventDefault();
		const _realName = checkAll(userValue.realName, "realName");
		const _accountNo = checkAll(userValue.accountNo, "accountNo");
		const _ifscCode = isIfscRequired
			? checkAll(userValue.ifscCode, "ifscCode")
			: { checked: true, message: "" };

		if (_realName.checked && _accountNo.checked && _ifscCode.checked) {
			api_accountStrict_SetCustBankInfo({
				AccountName: userValue.realName,
				AccountNo: userValue.accountNo,
				SysId: bankInfoSysList[userValue.bankId].sysId,
				IFSCCode: isIfscRequired ? userValue.ifscCode : null
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (!userInfo.accountName) {
								setUserInfo(prev => ({
									...prev,
									accountName: userValue.realName
								}));
							}
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.AddBankSuccess,
								refresh: true,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={clickClose}>
											OK
										</button>
									</div>
								)
							});
							GetCustBankInfo();
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	};

	return (
		<div className="addBankpop active" onSubmit={ClickSubmit}>
			<span className="title">{t("lbl_AddBankAccount")}</span>
			<div className="txt-lightgray">{t("lbl_UpdateBankInfo")}</div>
			{!userInfo.accountName ? (
				<Inputbox
					value={userValue.realName}
					onChange={editField.bind(this, "realName")}
					title={t("lbl_BankAccountName")}
					onBlur={checkAll.bind(this, userValue.realName, "realName")}
					clickInfo={clickInfo.bind(this, "realName")}
					checked={status.realName.checked}
					tip={status.realName.tip}
					inputBoxType="inputBox-blue"
				/>
			) : (
				<>
					<div className="txt">
						<div>
							<span className="txt-blue">
								{t("lbl_BankAccountName")}
							</span>
							<span>{userInfo.accountName}</span>
						</div>
						<div
							className="iconModule"
							onClick={clickInfo.bind(this, "realName_after")}>
							<i className="icon icon-information-solid" />
						</div>
					</div>
					<div
						className={`tip${
							status.realName_after.tip ? " active" : ""
						}`}>
						{status.realName_after.tip}
					</div>
				</>
			)}
			<div className="inputBox-blue">
				<Dropdown
					mainkey="bankList"
					options={bankInfoSysList}
					onSelectItem={onSelectItem}
					selectedIdx={userValue.bankId}
					imgUrl={`${cloudImgUrl}/SiteSkin/img/BankLogo/`}
					className="bankLogo"
					i18n={t}
				/>
			</div>
			<Inputbox
				className={`inputBox-blue${
					!status.accountNo.checked && status.accountNo.tip !== ""
						? " error"
						: ""
				}`}
				value={userValue.accountNo}
				onChange={editField.bind(this, "accountNo")}
				onBlur={checkAll.bind(this, userValue.accountNo, "accountNo")}
				title={t("lbl_BankNumber")}
				clickInfo={clickInfo.bind(this, "accountNo")}
				checked={status.accountNo.checked}
				tip={status.accountNo.tip}
			/>
			{isIfscRequired && (
				<Inputbox
					className={`inputBox-white${
						!status.ifscCode.checked && status.ifscCode.tip !== ""
							? " error"
							: ""
					}`}
					value={userValue.ifscCode}
					onChange={editField.bind(this, "ifscCode")}
					onBlur={checkAll.bind(this, userValue.ifscCode, "ifscCode")}
					title={t("lbl_IFSCCode")}
					clickInfo={clickInfo.bind(this, "ifscCode")}
					checked={status.ifscCode.checked}
					tip={status.ifscCode.tip}
				/>
			)}
			<div className="btnGroup">
				<button className="btn-cancel" onClick={clickClose}>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" onClick={ClickSubmit}>
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};
