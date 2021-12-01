import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CryptoCard from "./withdrawal.set.crypto.card";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/defPopBoxType";

import { api_accountStrict_DelCustUSDTInfo } from "../../service/api/accountStrict";
import {
	api_payment_GetExchangeInfo,
	api_payment_WithdrawalUSDTReq
} from "../../service/api/payment";

const Crypto = ({
	datas,
	onChangeUSDTInfo,
	currentUSDTDetail,
	hideDeleteIcon,
	updateCustBankInfo,
	deleteCryptoHandler
}) => {
	const { t } = useTranslation();
	const { setPopBox } = usePopBox();

	const addCryptoWallet = () =>
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.AddCryptoWallet,
			GetCustBankInfo: updateCustBankInfo
		});

	const accountCount = datas?.length ?? 0;

	return (
		<div className="addCrypto">
			<div className="remainder">
				{t("lbl_Number_Of_Wallet")}: {accountCount}/3
			</div>

			{datas.map(item => {
				const checked =
					item.usdtAddress === currentUSDTDetail.usdtAddress;

				return (
					<CryptoCard
						key={item.usdtAddress}
						item={item}
						onChange={() => onChangeUSDTInfo(item)}
						checked={checked}
						hideDeleteIcon={hideDeleteIcon}
						handlerDelete={() => deleteCryptoHandler(item)}
					/>
				);
			})}

			{datas.length < 3 && (
				<CryptoCard.NoBank onClick={addCryptoWallet} />
			)}

			<div className="remainder">
				{t("lbl_Crypto_Wallet_Submit_Note")}
			</div>
		</div>
	);
};

Crypto.propTypes = {
	datas: PropTypes.arrayOf(PropTypes.any).isRequired,
	onChangeUSDTInfo: PropTypes.func.isRequired,
	currentUSDTDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	hideDeleteIcon: PropTypes.bool.isRequired,
	updateCustBankInfo: PropTypes.func.isRequired,
	deleteCryptoHandler: PropTypes.func.isRequired
};

export { Crypto };

export const useUSDTFetcher = ({ isMountedRef }) => {
	const { t } = useTranslation();
	const { setPopBox, closePopBox, errorPopBox } = usePopBox();

	const confirmDeleteCryptoWallet = () =>
		new Promise(resolve => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ConfirmDelete,
				message: t("lbl_AreYouSureDelete"),
				message2: t("lbl_CantBeRestore"),
				onClickClose: closePopBox,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								resolve(true);
								closePopBox();
							}}>
							{t("lbl_Yes")}
						</button>
						<button
							className="btn-check"
							onClick={() => {
								resolve(false);
								closePopBox();
							}}>
							{t("lbl_No")}
						</button>
					</div>
				)
			});
		});

	const delCustUSDTInfo = ({ accountName, nickName, uSDTAddress }) =>
		api_accountStrict_DelCustUSDTInfo({
			accountName,
			nickName,
			uSDTAddress
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode !== 0) {
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

	const getExchangeInfo = amount =>
		api_payment_GetExchangeInfo(amount).then(
			// eslint-disable-next-line consistent-return
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						return res.data.data.rate;
					}

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

	const withdrawalUSDTReq = async ({ accountNo, amount }) => {
		let success = false;

		await api_payment_WithdrawalUSDTReq({ accountNo, amount }).then(
			// eslint-disable-next-line consistent-return
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						success = true;
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.WithdrawalSuccess,
							onClickClose: closePopBox,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={closePopBox}>
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
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);

		return success;
	};

	return {
		confirmDeleteCryptoWallet,
		delCustUSDTInfo,
		getExchangeInfo,
		withdrawalUSDTReq
	};
};
