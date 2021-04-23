import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import { checkAmount, isConvert } from "../../common/common";

const defAmountList = {
	2: [100, 300, 500, 1000, 2000],
	4: [500, 100, 3000, 5000, 10000],
	15: [300000, 500000, 1000000, 3000000, 5000000]
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
							onClick={() => onClick(shortcutAmount)}
							key={`shortcut-amount-${shortcutAmount}`}
							className={
								shortcutAmount === Number(amount)
									? "active"
									: ""
							}
							disabled={status !== 0}>
							{shortcutAmount}
						</button>
					);
				})}
		</div>
	);
};

export default ShortcutAmountList;

ShortcutAmountList.propTypes = {
	amount: PropTypes.number.isRequired,
	minAmount: PropTypes.number.isRequired,
	maxAmount: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired
};
