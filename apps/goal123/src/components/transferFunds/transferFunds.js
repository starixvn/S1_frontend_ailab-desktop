import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	walletInfoContext
} from "../common/context";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_account_GetBalance
} from "../../service/api/account";
import { isConvert } from "../common/common";
import {
	api_tp_Transfer,
	api_tp_TransferEx,
	api_tp_GetTransferRecent
} from "../../service/api/tp";
import { defPopBoxType } from "../common/popBox";
import ShowWallets from "./showWallets";
import SetAmount from "./setAmount";
import RecentHistory from "./recentHistory";
import { GetAllWallets } from "../common/wrapper.walletInfo";
import Loading from "../common/loading";
import usePopBox from "../hook/usePopBox";

const defDirection = {
	MainToTp: 1,
	TpToMain: 2
};

const initStatus = {
	checked: null,
	tip: ""
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
	const [loading, setLoading] = useState(true);
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

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getAllWalletData = () => {
		getMainWallet();
		getTpWalletList();
	};

	const getMainWallet = async () => {
		await api_account_GetBalance().then(res => {
			if (isMountedRef.current && res.data.errorCode === 0) {
				setWalletInfo(prev =>
					AfterUpdWalletList({
						prev,
						tpId: 0,
						balance: res.data.data,
						displayKey: "lbl_MainWallet"
					})
				);
			}
		});
	};

	const getTpWalletList = () => {
		const allWallet = 0;
		api_account_GetTpWalletList(allWallet).then(res => {
			if (isMountedRef.current && res.data.errorCode === 0) {
				getTpWalletBalance(res.data.data);
			}
		});
	};

	const getTpWalletBalance = tpArr => {
		if (tpArr?.length > 0) {
			tpArr.forEach(item => {
				setWalletInfo(prev =>
					AfterUpdWalletList({
						prev,
						tpId: item.tpId,
						balance: null,
						displayKey: `lbl_TpWallet_${item.tpId}`
					})
				);
				api_account_GetTpWalletBalance(item.tpId).then(res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						const { tpId, balance } = res.data.data;
						setWalletInfo(prev =>
							AfterUpdWalletList({
								prev,
								tpId,
								balance,
								displayKey: `lbl_TpWallet_${tpId}`
							})
						);
					}
				});
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
				tip: t("lbl_AmountTooltip")?.replace("{0}", 0)
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
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message:
					selectedTpId.from === null
						? t("lbl_please_select_from_wallet")
						: t("lbl_please_select_to_wallet"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={ClickClose}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
			checkPass = false;
		}
		return checkPass;
	};

	const refreshAfterTransfer = () => {
		getAllWalletData();
		getTransferRecent();
		setAmount("");
		GetAllWallets({ isLogin: userInfo.isLogin, dispatch });
	};

	const Transfer = async (_tpId, _amount, _direction) => {
		setLoading(true);
		await api_tp_Transfer({
			TpId: _tpId,
			amount: _amount,
			direction: _direction
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						refreshAfterTransfer();
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
										className="btn-cancel"
										onClick={ClickClose}>
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
		setLoading(false);
	};

	const TransferTp = async (_fromTpId, _toTpId, _amount) => {
		setLoading(true);
		await api_tp_TransferEx({
			FromTpId: _fromTpId,
			ToTpId: _toTpId,
			Amount: _amount
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						refreshAfterTransfer();
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
										onClick={ClickClose}>
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
		setLoading(false);
	};

	const clickSubmit = e => {
		e.preventDefault();
		const result = checkAmount() && checkSelectWallet();
		if (result) {
			const _direction =
				selectedTpId.from === 0
					? defDirection.MainToTp
					: defDirection.TpToMain;

			const real_amount = _isConvert
				? Number(amount) * 1000
				: Number(amount);

			const _wallet =
				_direction === defDirection.MainToTp
					? selectedTpId.to
					: selectedTpId.from;

			if (selectedTpId.to === 0 || selectedTpId.from === 0) {
				Transfer(_wallet, real_amount, _direction);
			} else {
				TransferTp(selectedTpId.from, selectedTpId.to, real_amount);
			}
			setStatus(initStatus);
			setAmount("");
		}
	};

	const restoreAll = id => {
		if (id === 0) {
			walletInfo
				.filter(o => o.id !== 0)
				.forEach(item => {
					if (item.balance > 0) {
						Transfer(item.id, item.balance, defDirection.TpToMain);
					}
				});
		} else {
			Transfer(id, walletInfo[0].balance, defDirection.MainToTp);
		}
		getMainWallet();
		getTpWalletList();
	};

	return loading ? (
		<Loading />
	) : (
		<div className="rightModule">
			<div className="infoModule">
				<div className="inside-title icon icon-icon32px_Funds-transfer">
					<span>{t("lbl_TransferFunds")}</span>
				</div>
				<div className="walletWrapper">
					<ShowWallets
						i18n={t}
						walletInfo={walletInfo}
						restoreAll={restoreAll}
						getAllWalletData={getAllWalletData}
						_isConvert={_isConvert}
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
							tp => tp.id === selectedTpId.to
						)}
						onSelectWallet={onSelectWallet}
					/>
				</div>
			</div>
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		</div>
	);
};
