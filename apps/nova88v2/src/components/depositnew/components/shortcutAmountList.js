import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import { checkAmount, isConvert, number_format } from "../../common/common";

const defAmountList = {
	2: [100, 300, 500, 1000, 2000],
	4: [500, 1000, 3000, 5000, 10000],
	15: [300, 500, 1000, 3000, 5000]
};

const ShortcutAmountList = ({ amount, minAmount, maxAmount, onClick }) => {
	const { t } = useTranslation();

	const { userInfo } = useContext(userInfoContext);
	const { currencyId } = userInfo;
	const _isConvert = isConvert(currencyId);

	const amountList = defAmountList[currencyId];

	return (
		<div className="btnGroup shortcut">
			{amountList?.length > 0 &&
				amountList.map(shortcutAmount => {
					const { status } = checkAmount(
						shortcutAmount,
						minAmount,
						maxAmount,
						_isConvert,
						t
					);

					return (
						<button
							onClick={() => {
								onClick(shortcutAmount);
							}}
							key={`shortcut-amount-${shortcutAmount}`}
							className={
								shortcutAmount === Number(amount)
									? "active"
									: ""
							}
							disabled={status !== 0}>
							{number_format(shortcutAmount)}
						</button>
					);
				})}
		</div>
	);
};

export default ShortcutAmountList;

ShortcutAmountList.defaultProps = {
	amount: null,
	minAmount: null,
	maxAmount: null
};

ShortcutAmountList.propTypes = {
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	minAmount: PropTypes.number,
	maxAmount: PropTypes.number,
	onClick: PropTypes.func.isRequired
};
