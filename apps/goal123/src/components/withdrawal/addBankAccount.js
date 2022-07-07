import React, { useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { api_payment_GetBankInfoSysList } from "../../service/api/payment";

const AddBankAccount = ({ updateCustBankInfo, bankInfoDetail }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const openPopBox = () => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.AddBankAccount,
			loading: true,
			updateCustBankInfo,
			bankInfoDetail
		});

		api_payment_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						const bankInfoArr = datas.map((item, i) => ({
							id: i,
							sysId: item.sysId,
							displayText: item.bankName,
							image: item.bankLogo?.toLowerCase()
						}));

						setPopBox(prevP => ({
							...prevP,
							loading: false,
							bankInfoSysList: bankInfoArr
						}));
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setPopBox(prevP => ({
							...prevP,
							loading: false
						}));
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setPopBox(prevP => ({
						...prevP,
						loading: false
					}));
				}
			}
		);
	};

	if (bankInfoDetail.length >= 3) return null;

	return (
		<div
			className="addBankName noBank"
			onClick={openPopBox}
			role="button"
			onKeyDown={openPopBox}
			tabIndex="0"
		>
			<div className="icon icon-plus" />
			<div>
				<div className="txt-yellow">{t("lbl_AddNewAccount")}</div>
			</div>
		</div>
	);
};

AddBankAccount.defaultProps = {
	bankInfoDetail: null
};

AddBankAccount.propTypes = {
	updateCustBankInfo: PropTypes.func.isRequired,
	bankInfoDetail: PropTypes.objectOf(PropTypes.any)
};
export default AddBankAccount;
