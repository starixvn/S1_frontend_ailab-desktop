import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { popBoxContext, userInfoContext } from "./context";
import { paymentImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";
import Inputbox from "./inputbox";
import Dropdown from "./dropdown";
import { defPopBoxType } from "./defPopBoxType";
import { api_accountStrict_SetCustEWalletInfo } from "../../service/api/accountStrict";

const PopBoxAddEWallet = ({
	custEWalletInfo, // 已新增的 EWallet List
	eWalletInfoSysList = [], // 打開 popUp 的 EWallet 下拉選單
	updateCustEWalletInfo
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState({
		realName: "",
		walletIdx: 0,
		accountNo: ""
	});
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
		}
	});
	const isMountedRef = useRef(null);

	const onSelectItem = i => {
		setUserValue(prev => ({ ...prev, walletIdx: i }));
	};

	const clickClose = () => {
		setPopBox({ isOpen: false, refresh: true });
	};

	const clickInfo = col => {
		let _tip = "";

		if (col === "realName") {
			_tip = t("lbl_BankAccountNameHint");
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
				: val.replace(/[\W_]/g, "");
		setUserValue(prev => ({ ...prev, [col]: val }));
	};

	const checkAll = (val, col) => {
		let checked = true;
		let message = "";
		const isDuplicateBank = custEWalletInfo?.find(
			_selectBank =>
				_selectBank.sysId ===
					eWalletInfoSysList[userValue.walletIdx].sysId &&
				_selectBank.accountNo === val
		);

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
			} else if (isDuplicateBank) {
				message = t("lbl_Prohibited_Duplicate_Bank_Account");
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

		if (eWalletInfoSysList?.length <= 0) {
			checked = false;
		}

		return { checked, message };
	};

	const ClickSubmit = e => {
		e.preventDefault();
		const _realName = checkAll(userValue.realName, "realName");
		const _accountNo = checkAll(userValue.accountNo, "accountNo");
		if (_realName.checked && _accountNo.checked) {
			api_accountStrict_SetCustEWalletInfo({
				AccountNo: userValue.accountNo,
				SysId: eWalletInfoSysList[userValue.walletIdx].sysId
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
							updateCustEWalletInfo();
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.AddBankSuccess,
								refresh: true,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={clickClose}
										>
											OK
										</button>
									</div>
								)
							});
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
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

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<div className="addBankpop active" onSubmit={ClickSubmit}>
			<span className="title">{t("lbl_AddEAccount")}</span>
			<div className="txt-lightgray">{t("lbl_UpdateBankInfo")}</div>

			{!userInfo.accountName ? (
				<Inputbox
					value={userValue.realName}
					onChange={editField.bind(this, "realName")}
					title={t("lbl_RealName")}
					onBlur={checkAll.bind(this, userValue.realName, "realName")}
					clickInfo={clickInfo.bind(this, "realName")}
					checked={status.realName.checked}
					tip={status.realName.tip}
				/>
			) : (
				<>
					<div className="txt">
						<div>
							<span className="txt-blue15">
								{t("lbl_RealName")}
							</span>
							<span>{userInfo.accountName}</span>
						</div>
						<div
							className="iconModule"
							onClick={clickInfo.bind(this, "realName_after")}
						>
							<i className="icon icon-information-solid" />
						</div>
					</div>
					<div>{status.realName_after.tip}</div>
				</>
			)}

			<div className="inputBox-blue">
				<Dropdown
					mainkey="bankList"
					options={eWalletInfoSysList}
					onSelectItem={onSelectItem}
					selectedIdx={userValue.walletIdx}
					imgUrl={`${paymentImgUrl}/square/`}
					className="bankLogo"
				/>
			</div>
			<Inputbox
				value={userValue.accountNo}
				onChange={editField.bind(this, "accountNo")}
				onBlur={checkAll.bind(this, userValue.accountNo, "accountNo")}
				title={t("lbl_EWalletAccountNumber")}
				clickInfo={clickInfo.bind(this, "accountNo")}
				checked={status.accountNo.checked}
				tip={status.accountNo.tip}
			/>
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

PopBoxAddEWallet.propTypes = {
	custEWalletInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
	eWalletInfoSysList: PropTypes.arrayOf(PropTypes.object).isRequired,
	updateCustEWalletInfo: PropTypes.func.isRequired
};

export default PopBoxAddEWallet;
