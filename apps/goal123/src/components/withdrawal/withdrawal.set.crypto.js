import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CryptoCard from "./withdrawal.set.crypto.card";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/popBox";

import { api_accountStrict_DelCustUSDTInfo } from "../../service/api/accountStrict";
import {
	api_payment_GetExchangeInfo,
	api_payment_WithdrawalCryptoReq
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
		<>
			{datas.map(item => {
				const { usdtAddress, currencyId } = currentUSDTDetail;
				const checked =
					item.usdtAddress === usdtAddress &&
					item.currencyId === currencyId;

				return (
					<CryptoCard
						key={`${item.currencyId}-${item.usdtAddress}`}
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
				{t("lbl_Number_Of_Wallet")}: {accountCount}/3
			</div>

			<div className="remainder blue">
				{t("lbl_Crypto_Wallet_Submit_Note")}
			</div>
		</>
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

	const delCustUSDTInfo = ({
		accountName,
		nickName,
		usdtAddress,
		currencyId
	}) =>
		api_accountStrict_DelCustUSDTInfo({
			accountName,
			nickName,
			usdtAddress,
			currencyId
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

	const getExchangeInfo = ({ amount, currencyName, network }) =>
		api_payment_GetExchangeInfo({ amount, currencyName, network }).then(
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

	const withdrawalUSDTReq = async ({ accountNo, amount, currencyId }) => {
		let success = false;

		await api_payment_WithdrawalCryptoReq({
			accountNo,
			amount,
			currencyId
		}).then(
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
