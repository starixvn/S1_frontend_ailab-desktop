import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { paymentImgUrl } from "../../config";

const BankCard = ({
	t,
	state,
	defPanel,
	custBankInfo,
	addBankAccount,
	selectAccount,
	delAccount,
	isIfscRequired
}) => {
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const _custBankInfo = custBankInfo?.bankInfoDetail;

	const bankArr = _custBankInfo?.map(item => {
		const _key = `withdrawal-bankCard-${item.accountNo}-${item.sysId}`;
		const _checked =
			item.accountNo === state.selectedAccount?.accountNo &&
			item.bankName === state.selectedAccount?.bankName &&
			!item.disabled;
		return (
			<BankCardLayout
				key={_key}
				t={t}
				checkKey={item.accountNo}
				bankInfo={item}
				selectAccount={() => selectAccount(item)}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
				hideDelBtn={state.panel === defPanel.confirm}
				isIfscRequired={isIfscRequired}
				disabled={item.disabled}
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
						onClick={addBankAccount}>
						<div className="icon icon-plus" />
						<div>{t("lbl_AddBankAccount")}</div>
					</div>
				)}

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
	hideDelBtn,
	isIfscRequired,
	disabled
}) => {
	const bankLogo = String(bankInfo.bankLogo).toLowerCase();
	return (
		<div className={`addBankName ${disabled ? "pending" : ""}`}>
			{disabled && (
				<div className="mask">{t("lbl_underMaintenance")}</div>
			)}
			<div className="addBankInfo">
				<div className="bankName">
					<img src={`${paymentImgUrl}/square/${bankLogo}`} alt="" />

					<div>
						{bankInfo.bankName}
						<div className="txt-blue">
							<span>{bankInfo.accountNo?.slice(0, 4)}</span>
							<span>{bankInfo.accountNo?.slice(4, 8)}</span>
							<span>{bankInfo.accountNo?.slice(8, 12)}</span>
							<span>{bankInfo.accountNo?.slice(12, 16)}</span>
						</div>
						{isIfscRequired && (
							<div className="txt-gray">
								<span>
									{t("lbl_IFSCCode")}:
									{bankInfo.ifscCode ?? ""}
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id={checkKey}
						onChange={selectAccount}
						checked={checked}
						disabled={disabled}
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

BankCard.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	defPanel: PropTypes.objectOf(PropTypes.any).isRequired,
	custBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	addBankAccount: PropTypes.func.isRequired,
	selectAccount: PropTypes.func.isRequired,
	delAccount: PropTypes.func.isRequired,
	isIfscRequired: PropTypes.bool.isRequired
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
	delAccount: PropTypes.func.isRequired,
	isIfscRequired: PropTypes.bool.isRequired,
	disabled: PropTypes.bool.isRequired
};

export default BankCard;
