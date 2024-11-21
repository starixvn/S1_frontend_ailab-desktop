import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../../common/common";

const FixedAmountList = ({
	minAmount,
	maxAmount,
	amountList,
	amount,
	_isConvert,
	onChangeForm
}) => {
	if (amountList?.length <= 0) return null;
	return (
		<div className="btnGroup buttonBox" style={{ marginBottom: "20px" }}>
			{amountList?.map(a => {
				const _afterConvertAmount = _isConvert ? a / 1000 : a;
				const isSelected = Number(amount) === _afterConvertAmount;

				return (
					<button
						onClick={() =>
							onChangeForm(_afterConvertAmount, "amount")
						}
						className={`blue${isSelected ? " active" : ""}`}
						key={`deposit-mobile-${a}`}
					>
						{number_format({
							number: a,
							formatRequired: _isConvert,
							digits: 0
						})}
						<i className="icon icon-checkmark" />
					</button>
				);
			})}
		</div>
	);
};

FixedAmountList.defaultProps = {
	amount: ""
};

FixedAmountList.propTypes = {
	minAmount: PropTypes.number.isRequired,
	maxAmount: PropTypes.number.isRequired,
	amountList: PropTypes.arrayOf(PropTypes.any).isRequired,
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	_isConvert: PropTypes.bool.isRequired,
	onChangeForm: PropTypes.func.isRequired
};

export default FixedAmountList;
