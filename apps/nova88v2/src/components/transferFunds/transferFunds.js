import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	loadingContext,
	walletInfoContext
} from "../common/context";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_account_GetBalance
} from "../../service/api/account";
import { isConvert } from "../common/common";
import {
	api_tp_GetTransferRecent,
	api_tp_TransferEx
} from "../../service/api/tp";
import defPopBoxType from "../common/defPopBoxType";
import TransferHeader from "./transfer.header";
import ShowWallets from "./showWallets";
import SetAmount from "./setAmount";
import RecentHistory from "./recentHistory";
import { GetAllWallets } from "../common/wrapper.walletInfo";
import usePopBox from "../hook/usePopBox";

const initStatus = {
	checked: null,
	tip: ""
};

const defTransferAction = {
	transfer: 1,
	restoreAll: 2
};

const AfterUpdWalletList = ({
	prev,
	tpId,
	balance,
	displayKey,
	displayText,
	walletMode
}) => {
	const idx = prev.findIndex(p => p.id === tpId);
	if (idx !== -1) {
		if (balance !== null) {
			prev[idx].balance = balance;
		}
	} else {
		prev.push({
			id: tpId,
			displayKey,
			balance,
			displayText,
			walletMode
		});
	}
	return [...prev].sort((a, b) => a.id - b.id);
};

export default () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const [amount, setAmount] = useState("");
	const [walletInfo, setWalletInfo] = useState([]);
	const [selectedTpId, setSelectedTpId] = useState({
		from: null,
		to: null
	});
	const [status, setStatus] = useState(initStatus);
	const [getHistory, setGetHistory] = useState(null);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { loading, setLoading } = useContext(loadingContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const { dispatch } = useContext(walletInfoContext);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		async function getInitialData() {
			setLoading(true);
			await getTransferRecent();
			await getMainWallet();
			getTpWalletList();
			setLoading(false);
		}
		getInitialData();
	}, []);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickInfo = () => {
		const _msg =
			status.tip === ""
				? t("lbl_AmountTooltip")?.replace("{0}", "1")
				: "";
		setStatus({
			checked: null,
			tip: _msg
		});
	};

	const getAllWalletData = () => {
		getMainWallet();
		getTpWalletList();
	};

	const refreshAfterTransfer = () => {
		getAllWalletData();
		GetAllWallets({
			langId: userInfo.langId,
			isLogin: userInfo.isLogin,
			dispatch,
			errorPopBox
		});
		getTransferRecent();
		setAmount("");
	};

	const getMainWallet = async () => {
		await api_account_GetBalance().then(
			res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					setWalletInfo(prev =>
						AfterUpdWalletList({
							prev,
							tpId: 0,
							balance: res.data.data,
							displayKey: "lbl_MainWallet"
						})
					);
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
	};

	const getTpWalletList = () => {
		const allWallet = 0;
		api_account_GetTpWalletList(allWallet, userInfo?.langId).then(
			res => {
				if (isMountedRef.current && res.data.errorCode === 0) {
					getTpWalletBalance(res.data.data);
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
	};

	const getTpWalletBalance = tpArr => {
		if (tpArr?.length > 0) {
			tpArr.forEach(item => {
				setWalletInfo(prev =>
					AfterUpdWalletList({
						prev,
						tpId: item.tpId,
						balance: null,
						displayText: item.tpName,
						walletMode: item.walletMode
					})
				);
				api_account_GetTpWalletBalance(item.tpId).then(
					res => {
						if (res.data.errorCode === 0 && isMountedRef.current) {
							const { tpId, balance } = res.data.data;
							setWalletInfo(prev =>
								AfterUpdWalletList({
									prev,
									tpId,
									balance
								})
							);
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
			});
		}
	};

	const getTransferRecent = async () => {
		await api_tp_GetTransferRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setGetHistory(res.data.data);
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
	};

	const EditAmount = e => {
		let { value } = e.target;
		value = value.replace(/^(0+)|[^\d]+/g, "");
		setAmount(value);
	};

	const checkAmount = () => {
		let _checked = true;
		if (!amount > 0) {
			setStatus({
				checked: false,
				tip: t("lbl_AmountTooltip")?.replace("{0}", 1)
			});
			_checked = false;
		} else {
			setStatus({
				checked: true,
				tip: ""
			});
		}
		return _checked;
	};

	const onSelectWallet = (col, i, value) => {
		setSelectedTpId(prev => {
			const oppsCol = col === "from" ? "to" : "from";
			let result;
			if (col === "from") {
				result = {
					[col]: value.id,
					[oppsCol]:
						value.id === selectedTpId.to ? null : prev[oppsCol]
				};
			} else {
				result = {
					[col]: value.id,
					[oppsCol]:
						value.id === selectedTpId.from ? null : prev[oppsCol]
				};
			}
			return result;
		});
	};

	const checkSelectWallet = () => {
		let checkPass = true;
		if (selectedTpId.from === null || selectedTpId.to === null) {
			errorPopBox(
				selectedTpId.from === null
					? t("lbl_please_select_from_wallet")
					: t("lbl_please_select_to_wallet")
			);
			checkPass = false;
		}
		return checkPass;
	};

	const Transfer = async (_fromTpId, _toTpId, _amount, transferAction) => {
		setLoading(true);
		await api_tp_TransferEx({
			FromTpId: _fromTpId,
			ToTpId: _toTpId,
			Amount: _amount,
			TransferAction: transferAction,
			LangId: userInfo.langId
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 9) {
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
										onClick={ClickClose}
									>
										OK
									</button>
								</div>
							)
						});
					} else if (
						res.data.errorCode !== 0 &&
						res.data.errorCode !== 9
					) {
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
		setLoading(false);
	};

	const clickSubmit = async e => {
		e.preventDefault();
		const result = checkAmount() && checkSelectWallet();
		if (result) {
			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);
			await Transfer(
				selectedTpId.from,
				selectedTpId.to,
				real_amount,
				defTransferAction.transfer
			);
			refreshAfterTransfer();
			setStatus(initStatus);
		}
	};

	const restoreAll = async _toWalletId => {
		const _filterWallets = walletInfo.filter(
			_wallet => _wallet.id !== _toWalletId && _wallet.balance > 0
		);

		await Promise.all(
			_filterWallets.map(async _wallet => {
				await Transfer(
					_wallet.id,
					_toWalletId,
					_wallet.balance,
					defTransferAction.restoreAll
				);
			})
		);

		refreshAfterTransfer();
	};

	const clickManual = walletId => {
		setSelectedTpId(prev => ({
			from: walletId === prev.from ? null : prev.from,
			to: walletId
		}));
	};

	return loading ? null : (
		<div className="rightModule">
			<div className="infoModule">
				<TransferHeader t={t} />
				<ShowWallets
					i18n={t}
					walletInfo={walletInfo}
					restoreAll={restoreAll}
					getAllWalletData={getAllWalletData}
					_isConvert={_isConvert}
					clickManual={clickManual}
				/>
				<SetAmount
					t={t}
					amount={amount}
					onChange={EditAmount}
					clickSubmit={clickSubmit}
					clickInfo={clickInfo}
					onBlur={checkAmount}
					checked={status.checked}
					tip={status.tip}
					_isConvert={_isConvert}
					walletOptions={walletInfo}
					selectedFromIdx={walletInfo.findIndex(
						f => f.id === selectedTpId.from
					)}
					selectedToIdx={walletInfo.findIndex(
						f => f.id === selectedTpId.to
					)}
					onSelectWallet={onSelectWallet}
				/>
			</div>
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		</div>
	);
};
