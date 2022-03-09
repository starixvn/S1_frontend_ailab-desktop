import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const CryptoCard = ({
	item,
	onChange,
	checked,
	hideDeleteIcon,
	handlerDelete
}) => {
	const { nickName, usdtAddress, network, currencyName, currencyId } = item;

	const checkKey = `${currencyId}-${usdtAddress}`;
	const _network =
		network === currencyName ? network : `${currencyName}-${network}`;

	return (
		<div className="addBankName">
			<div className="cryptoInfo">
				<div className="title">{nickName}</div>
				<div className="title">{_network}</div>
			</div>

			<div className="cryptoInfo">
				<i className="icon icon-crypto" />
				<div className="name">{usdtAddress}</div>

				<div className="checkbox">
					<input
						type="checkbox"
						id={checkKey}
						checked={checked}
						onChange={onChange}
					/>
					<label
						htmlFor={checkKey}
						className="icon icon-checkbox-checked"
					/>
				</div>

				{!hideDeleteIcon && (
					<button className="icon icon-bin" onClick={handlerDelete} />
				)}
			</div>
		</div>
	);
};

CryptoCard.propTypes = {
	item: PropTypes.objectOf(PropTypes.any).isRequired,
	onChange: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	hideDeleteIcon: PropTypes.bool.isRequired,
	handlerDelete: PropTypes.func.isRequired
};
const CryptoNoBankCard = ({ onClick }) => {
	const { t } = useTranslation();

	return (
		<div className="addBankName noBank" onClick={onClick}>
			<div className="icon icon-plus" />
			<div>
				<div className="txt-yellow">{t("lbl_Add_Crypto_Wallet")}</div>
			</div>
		</div>
	);
};

CryptoNoBankCard.propTypes = {
	onClick: PropTypes.func.isRequired
};

CryptoCard.NoBank = CryptoNoBankCard;

CryptoCard.defaultProps = {
	nickName: "",
	usdtAddress: ""
};

CryptoCard.propTypes = {
	nickName: PropTypes.string,
	usdtAddress: PropTypes.string
};

export default CryptoCard;
