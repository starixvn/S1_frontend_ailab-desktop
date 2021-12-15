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
	const { nickName, usdtAddress } = item;

	const checkKey = usdtAddress;

	return (
		<div className="addCryptoName">
			<div className="addCryptoInfo">
				<div className="cryptoName">
					<div className="icon icon-USDT">
						<span>{nickName}</span>
					</div>
				</div>
				<div>
					{!hideDeleteIcon && (
						<button
							className="icon icon-bin"
							onClick={handlerDelete}
						/>
					)}

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
				</div>
			</div>
			<div className="addCryptoInfo">
				<div className="txt-dark">
					<span>{usdtAddress}</span>
				</div>
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
		<div className="addCryptoName noBank" onClick={onClick}>
			<div className="icon icon-plus" />
			<div>{t("lbl_Add_Crypto_Wallet")}</div>
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
