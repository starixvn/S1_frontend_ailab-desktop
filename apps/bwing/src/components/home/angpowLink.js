import React from "react";
import { Link } from "@reach/router";
import moment from "moment";
import { isDateRange } from "../common/common";
import { eventPeriod } from "../angPow/angPow.def";

const { startDate, endDate } = eventPeriod;
const currentDate = moment();
const isInPeriod = isDateRange(currentDate, startDate, endDate);

const AngpowLink = ({ to }) => {
	if (!isInPeriod) return null;

	return (
		<Link to={to} alt="money" className="money">
			<div className="box" />
			<div className="l" />
			<div className="l" />
			<div className="l" />
			<div className="l" />
			<div className="l" />
		</Link>
	);
};
export default AngpowLink;
