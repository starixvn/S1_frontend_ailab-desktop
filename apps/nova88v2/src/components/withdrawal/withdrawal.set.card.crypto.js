import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const CryptoCard = ({
	t,
	state,
	isUSDT,
	custBankInfo,
	selectAccount,
	addCryptoWallet
}) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const usdtWalletArr = custBankInfo?.map(item => {
		const _key = `withdrawal-usdt-${item.usdtAddress}`;
		const _checked =
			item.usdtAddress === state.selectedAccount?.usdtAddress;

		return (
			<CryptoCardLayout
				key={_key}
				checkKey={item.usdtAddress}
				{...item}
				selectAccount={selectAccount.bind(this, item)}
				checked={_checked}
			/>
		);
	});

	return (
		<div className="addBank">
			{custBankInfo.length > 0 ? usdtWalletArr : null}
			{custBankInfo.length === 0 ? (
				<div className="addBankName noBank" onClick={addCryptoWallet}>
					<div className="icon icon-plus" />
					<div>{t("lbl_Add_Crypto_Wallet")}</div>
				</div>
			) : null}
			<div className="remainder">
				{t("lbl_Number_Of_Wallet")}:{custBankInfo?.length ?? 0}/
				{isUSDT
					? custBankInfo?.length === 0
						? "3"
						: custBankInfo?.length
					: "3"}
			</div>
		</div>
	);
};

const CryptoCardLayout = props => {
	return (
		<div className="addBankName">
			<div className="cryptoInfo">
				<i className="icon icon-USDT" />
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
			<div className="walletNickname">{props.nickName}</div>
		</div>
	);
};

CryptoCard.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	isUSDT: PropTypes.bool.isRequired,
	custBankInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
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
