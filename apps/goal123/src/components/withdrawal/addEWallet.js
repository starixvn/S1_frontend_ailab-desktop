import PropTypes from "prop-types";
import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { api_payment_GetEWalletInfoSysList } from "../../service/api/payment";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";

const AddEWallet = ({ custEWalletInfo, updateCustEWalletInfo }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	const openPopBox = () => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.AddEWallet,
			loading: true,
			custEWalletInfo,
			updateCustEWalletInfo
		});

		api_payment_GetEWalletInfoSysList().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					const datas = res.data.data;

					const eWalletInfoSysList = datas.map((item, i) => ({
						id: i,
						sysId: item.sysId,
						displayText: item.eWalletName,
						image: item.eWalletLogo?.toLowerCase()
					}));

					setPopBox(prevP => ({
						...prevP,
						loading: false,
						eWalletInfoSysList
					}));
				}
			} else {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.ErrorMsg,
					message: `[${res.data.errorCode}] ${res.data.message}`,
					btnBar: (
						<div className="btnGroup">
							<button className="btn-cancel" onClick={ClickClose}>
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
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	if (custEWalletInfo?.length >= 3) return null;

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
				<div className="txt-yellow">{t("lbl_AddEAccount")}</div>
			</div>
		</div>
	);
};

AddEWallet.defaultProps = {
	custEWalletInfo: null
};

AddEWallet.propTypes = {
	updateCustEWalletInfo: PropTypes.func.isRequired,
	custEWalletInfo: PropTypes.objectOf(PropTypes.any)
};

export default AddEWallet;
