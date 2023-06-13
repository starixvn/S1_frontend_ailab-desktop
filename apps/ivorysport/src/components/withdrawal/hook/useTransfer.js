import React, { useState, useRef, useEffect, useContext } from "react";
import { api_tp_Transfer } from "../../../service/api/tp";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance
} from "../../../service/api/account";
import { userInfoContext, walletInfoContext } from "../../common/context";
import usePopBox from "../../hook/usePopBox";
import defPopBoxType from "../../common/defPopBoxType";
import { GetAllWallets } from "../../common/wrapper.walletInfo";
import { isConvert } from "../../common/common";

const defDirection = {
	MainToTp: 1,
	TpToMain: 2
};

const useTransfer = () => {
	const isMountedRef = useRef(null);

	const { userInfo } = useContext(userInfoContext);
	const { dispatch } = useContext(walletInfoContext);

	const { errorPopBox, setPopBox } = usePopBox();

	const _isConvert = isConvert(userInfo.currencyId);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const postTransfer = async (tpId, amount, direction) => {
		await api_tp_Transfer({
			TpId: tpId,
			amount,
			direction
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						GetAllWallets({
							langId: userInfo.langId,
							isLogin: userInfo.isLogin,
							dispatch
						});
					} else if (res.data.errorCode === 9) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.TurnoverAccumulated,
							currencyId: userInfo.currencyId,
							_isConvert,
							turnover: res.data.data.turnover,
							rollover: res.data.data.rollover,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={closePopBox}
									>
										OK
									</button>
								</div>
							)
						});
					} else {
						errorPopBox(
							res.data.message || `error`,
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
	};

	const getTpWalletList = async () => {
		const allWallet = 0;
		let tpWalletList = [];

		await api_account_GetTpWalletList(allWallet, userInfo?.langId).then(
			async res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					tpWalletList = res.data.data;
				} else if (res.data.errorCode !== 0) {
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

		return tpWalletList;
	};

	const getTpWalletBalance = async tpArr => {
		let walletInfo = [];

		if (tpArr?.length > 0) {
			await Promise.all(
				tpArr.map(async item => {
					walletInfo = AfterUpdWalletList({
						prev: walletInfo,
						tpId: item.tpId,
						balance: null,
						displayKey: `lbl_TpWallet_${item.tpId}`
					});

					await api_account_GetTpWalletBalance(item.tpId).then(
						res => {
							if (
								res.data.errorCode === 0 &&
								isMountedRef.current
							) {
								const { tpId, balance } = res.data.data;
								walletInfo = AfterUpdWalletList({
									prev: walletInfo,
									tpId,
									balance,
									displayKey: `lbl_TpWallet_${tpId}`
								});
							} else if (res.data.errorCode !== 0) {
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
				})
			);
		}

		return walletInfo;
	};

	const AfterUpdWalletList = ({ prev, tpId, balance, displayKey }) => {
		const idx = prev.findIndex(p => p.id === tpId);
		if (idx !== -1) {
			if (balance !== null) {
				prev[idx].balance = balance;
			}
		} else {
			prev.push({
				id: tpId,
				displayKey,
				balance
			});
		}
		return [...prev].sort((a, b) => a.id - b.id);
	};

	const restoreAllBalanceToMainWallet = async () => {
		const tpWalletList = await getTpWalletList();
		const walletInfo = await getTpWalletBalance(tpWalletList);

		await Promise.all(
			walletInfo.map(async item => {
				if (item.balance > 0) {
					await postTransfer(
						item.id,
						item.balance,
						defDirection.TpToMain
					);
				}
			})
		);
	};

	return { restoreAllBalanceToMainWallet };
};

export default useTransfer;
