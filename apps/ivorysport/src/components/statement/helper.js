import moment from "moment";

export const dateTimeFormater = displayKey => {
	let _startDate = "";
	let _endDate = "";

	switch (displayKey) {
		case "lbl_Today":
			_startDate = moment().startOf("day");
			_endDate = moment().endOf("day");

			break;
		case "lbl_YesterDay":
			_startDate = moment().subtract(1, "days");
			_endDate = moment().subtract(1, "days");

			break;
		case "lbl_ThisWeek":
			_startDate = moment().startOf("week");
			_endDate = moment().endOf("week");

			break;
		case "lbl_LastWeek":
			_startDate = moment().subtract(1, "week").startOf("week");
			_endDate = moment().subtract(1, "week").endOf("week");

			break;
		case "lbl_ThisMonth":
			_startDate = moment().startOf("month");
			_endDate = moment().endOf("month");

			break;
		default:
			_startDate = moment().startOf("month");
			_endDate = moment().endOf("month");

			break;
	}

	return [_startDate.format("YYYY-MM-DD"), _endDate.format("YYYY-MM-DD")];
};

export const numberSumReducer = (data, key) => {
	const reducer = (accu, cur) => accu + Number(cur[key]);
	return data.reduce(reducer, 0);
};
