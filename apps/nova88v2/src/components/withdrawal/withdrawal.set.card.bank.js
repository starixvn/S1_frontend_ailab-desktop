import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import config from "../../config";

const BankCard = ({
	t,
	defPanel,
	state,
	addBankAccount,
	selectAccount,
	delAccount,
	custBankInfo
}) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const bankArr = custBankInfo?.map(item => {
		const _key = `withdrawal-bankCard-${item.accountNo}`;
		const _checked = item.accountNo === state.selectedAccount?.accountNo;

		return (
			<BankCardLayout
				key={_key}
				checkKey={item.accountNo}
				{...item}
				selectAccount={selectAccount.bind(this, item)}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
				hideDelBtn={state.panel === defPanel.confirm}
			/>
		);
	});

	return (
		<div className="addBank">
			{custBankInfo.length > 0 ? bankArr : null}
			{custBankInfo.length < 3 ? (
				<div className="addBankName noBank" onClick={addBankAccount}>
					<div className="icon icon-plus" />
					<div>{t("lbl_AddBankAccount")}</div>
				</div>
			) : null}
			<div className="remainder">
				{t("lbl_NumberOfBankAccounts")}:{custBankInfo?.length ?? 0}/3
			</div>
		</div>
	);
};

const BankCardLayout = props => {
	return (
		<div className="addBankName">
			<div className="addBankInfo">
				<div className="bankName">
					<img
						src={`${config.imgUrl}/common/images/BankLogo/${props.bankLogo}`}
						alt=""
					/>
				</div>
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
			<div className="addBankInfo">
				<div className="txt-blue">
					<span>{props.accountNo?.slice(0, 4)}</span>
					<span>{props.accountNo?.slice(4, 8)}</span>
					<span>{props.accountNo?.slice(8, 12)}</span>
					<span>{props.accountNo?.slice(12, 16)}</span>
				</div>
				{props.hideDelBtn ? null : (
					<button
						className="icon icon-bin"
						onClick={props.delAccount}
					/>
				)}
			</div>
		</div>
	);
};

BankCard.propTypes = {
	t: PropTypes.func.isRequired,
	defPanel: PropTypes.objectOf(PropTypes.any).isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	addBankAccount: PropTypes.func.isRequired,
	selectAccount: PropTypes.func.isRequired,
	delAccount: PropTypes.func.isRequired,
	custBankInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

BankCardLayout.defaultProps = {
	bankLogo: "",
	accountNo: "",
	checkKey: null
};

BankCardLayout.propTypes = {
	bankLogo: PropTypes.string,
	accountNo: PropTypes.string,
	checkKey: PropTypes.string,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	hideDelBtn: PropTypes.bool.isRequired,
	delAccount: PropTypes.func.isRequired
};

export default BankCard;
