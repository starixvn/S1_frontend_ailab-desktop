import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { cloudImgUrl } from "../../config";

const ECard = ({
	t,
	state,
	defPanel,
	custEWalletInfo,
	addEAccount,
	selectAccount,
	delAccount
}) => {
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});
	const bankArr = custEWalletInfo?.map(item => {
		const _key = `withdrawal-eWallet-${item.accountNo}`;
		const _checked =
			item.accountNo === state.selectedAccount?.accountNo &&
			item.eWalletName === state.selectedAccount?.bankName;
		return (
			<BankCardLayout
				key={_key}
				t={t}
				checkKey={item.accountNo}
				bankInfo={item}
				selectAccount={() => {
					selectAccount(item);
				}}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
				hideDelBtn={state.panel === defPanel.confirm}
			/>
		);
	});

	return (
		<div className="walletModule">
			<div className="addBank">
				{bankArr}
				{(!bankArr || bankArr.length < 3) && (
					<div
						className="addBankName noBank"
						onClick={() => addEAccount()}>
						<div className="icon icon-plus" />
						<div>{t("lbl_AddEAccount")}</div>
					</div>
				)}
				<div className="remainder">
					{t("lbl_Number_Of_Wallet")}:{bankArr.length} / 3
				</div>
				<div className="tip active">
					{t("lbl_E_Wallet_Submit_Note")}
				</div>
				{/* <div className="remainder">
				{t("lbl_NumberOfBankAccounts")}:{custBankInfo?.length ?? 0}/3
				</div> */}
			</div>
		</div>
	);
};

const BankCardLayout = ({
	t,
	checkKey,
	bankInfo,
	selectAccount,
	checked,
	delAccount,
	hideDelBtn
}) => {
	const bankLogo = String(bankInfo.eWalletLogo).toLowerCase();
	return (
		<div className="addBankName">
			<div className="addBankInfo">
				<div className="bankName">
					<img
						src={`${cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
						alt=""
					/>

					<div>
						{bankInfo.eWalletName}
						<div className="txt-blue">
							<span>{bankInfo.accountNo?.slice(0, 4)}</span>
							<span>{bankInfo.accountNo?.slice(4, 8)}</span>
							<span>{bankInfo.accountNo?.slice(8, 12)}</span>
							<span>{bankInfo.accountNo?.slice(12, 16)}</span>
						</div>
					</div>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id={checkKey}
						onChange={selectAccount}
						checked={checked}
					/>
					<label
						htmlFor={checkKey}
						className="icon icon-checkbox-checked"
					/>
				</div>
			</div>
			{hideDelBtn ? null : (
				<button className="icon icon-bin" onClick={delAccount} />
			)}
		</div>
	);
};

ECard.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	defPanel: PropTypes.objectOf(PropTypes.any).isRequired,
	custEWalletInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
	addEAccount: PropTypes.func.isRequired,
	selectAccount: PropTypes.func.isRequired,
	delAccount: PropTypes.func.isRequired
};

BankCardLayout.defaultProps = {
	checkKey: null
};

BankCardLayout.propTypes = {
	t: PropTypes.func.isRequired,
	checkKey: PropTypes.string,
	bankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	hideDelBtn: PropTypes.bool.isRequired,
	delAccount: PropTypes.func.isRequired
};

export default ECard;
