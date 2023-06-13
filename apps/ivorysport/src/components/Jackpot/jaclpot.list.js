import React from "react";
import PropTypes from "prop-types";
import { uuidv4 } from "../common/common";
import { isNumber } from "./jackpot.common";

const JaclpotList = ({ jackpotItemList }) => {
	return jackpotItemList.map(item => (
		<JackpotItem key={`pt-jackpot-${uuidv4()}`} item={item} />
	));
};

JaclpotList.propTypes = {
	jackpotItemList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default JaclpotList;

export const JackpotItem = ({ item }) => {
	const key = `jackpot-text-item-${uuidv4()}`;

	if (item === "," || item === ".")
		return (
			<div key={key}>
				<div>{item}</div>
			</div>
		);

	if (isNumber(item))
		return (
			<div className="numberRow" key={key}>
				<div className="active">
					{item.map((num, idx) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={`${key}-${idx}`}>{num}</div>
					))}
				</div>
			</div>
		);

	return "";
};

JackpotItem.defaultProps = {
	item: null
};

JackpotItem.propTypes = {
	item: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.arrayOf(PropTypes.number)
	])
};
