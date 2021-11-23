import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import { api_accountStrict_delCustUSDTInfo } from "../../service/api/accountStrict";

const CryptoCard = ({
	t,
	state,
	custBankInfo,
	selectAccount,
	addCryptoWallet,
	userInfo,
	GetCustBankInfo
}) => {
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();
	const { setPopBox } = useContext(popBoxContext);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const _custBankInfo = custBankInfo?.uSDTDetail || [];

	const delUSDTwallet = ({ USDTAddress, NickName, AccountName }) => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ConfirmDelete,
			message: t("lbl_AreYouSureDelete"),
			message2: t("lbl_CantBeRestore"),
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-check"
						onClick={() =>
							removeUSDT({
								USDTAddress,
								NickName,
								AccountName
							})
						}>
						{t("lbl_Yes")}
					</button>
					<button
						className="btn-cancel"
						onClick={() => setPopBox({ isOpen: false })}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const removeUSDT = ({ USDTAddress, NickName, AccountName }) => {
		api_accountStrict_delCustUSDTInfo({
			USDTAddress,
			NickName,
			AccountName
		})
			.then(res => {
				if (res.data.errorCode === 0) {
					setPopBox({ isOpen: false });
					GetCustBankInfo();
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() =>
										setPopBox({ isOpen: false })
									}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			})
			.catch(() => {
				errorPopBox();
			});
	};

	const usdtWalletArr = _custBankInfo?.map(item => {
		const _key = `withdrawal-usdt-${item.usdtAddress}`;
		const _checked =
			item.usdtAddress === state.selectedAccount?.usdtAddress;

		return (
			<CryptoCardLayout
				key={_key}
				delUSDTwallet={delUSDTwallet}
				checkKey={item.usdtAddress}
				{...item}
				selectAccount={selectAccount.bind(this, item)}
				checked={_checked}
				userInfo={userInfo}
			/>
		);
	});

	if (usdtWalletArr?.length < 3) {
		usdtWalletArr.push(
			<div className="addBankName noBank" onClick={addCryptoWallet}>
				<div className="icon icon-plus" />
				<div>{t("lbl_Add_Crypto_Wallet")}</div>
			</div>
		);
	}
	return (
		<div className="walletModule">
			<div className="addBank">
				{usdtWalletArr}
				<div className="remainder">
					{t("lbl_Number_Of_Wallet")}:{_custBankInfo?.length ?? 0} / 3
				</div>
				<div className="tip active">
					{t("lbl_Crypto_Wallet_Submit_Note")}
				</div>
			</div>
		</div>
	);
};

const CryptoCardLayout = props => {
	return (
		<div className="addBankName">
			<div className="cryptoInfo">
				<div className="title">{props.nickName}</div>
				<i className="icon icon-BTC" />
				<div>{props.usdtAddress}</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id={props.checkKey}
						onChange={props.selectAccount}
						checked={props.checked}
					/>
					<label
						htmlFor={props.checkKey}
						className="icon icon-checkbox-checked"
					/>
				</div>
			</div>
			<button
				className="icon icon-bin"
				onClick={() =>
					props.delUSDTwallet({
						USDTAddress: props.usdtAddress,
						NickName: props.nickName,
						AccountName: props.userInfo.accountName
					})
				}
			/>
		</div>
	);
};

CryptoCard.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	custBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	selectAccount: PropTypes.func.isRequired,
	addCryptoWallet: PropTypes.func.isRequired
};

CryptoCardLayout.defaultProps = {
	usdtAddress: "",
	checkKey: null,
	nickName: ""
};

CryptoCardLayout.propTypes = {
	usdtAddress: PropTypes.string,
	checkKey: PropTypes.string,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	nickName: PropTypes.string
};
export default CryptoCard;
