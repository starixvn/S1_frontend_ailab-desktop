import React from "react";
import { number_format } from "../common/common";

export default ({
	minAmount,
	maxAmount,
	displayTextLimit,
	displayTextUnLimit,
	_isConvert
}) => {
	return !minAmount && !maxAmount ? (
		<span className="txt-lightgray">
			{displayTextLimit} {displayTextUnLimit}
		</span>
	) : (
		<span className="txt-lightgray">
			{displayTextLimit}{" "}
			{`${number_format({
				number: minAmount,
				formatRequired: _isConvert
			})} ~ ${number_format({
				number: maxAmount,
				formatRequired: _isConvert
			})}`}
		</span>
	);
};
