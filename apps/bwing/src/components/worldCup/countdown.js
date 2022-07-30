import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { isDateRange } from "../common/common";
import useInterval from "../hook/useInterval";
import { bannerImgUrl } from "../../config";

const DURATION_TIME = {
	// startDate: "2022-07-26 12:00:00", // GMT+0800
	endDate: "2022-11-21 18:00:00" // GMT+0800
};

export default () => {
	const { t } = useTranslation();

	const [diffTime, setDiffTime] = useState();
	const [countTime, setCountTime] = useState(1000);

	const { startDate, endDate } = DURATION_TIME;
	const _startDate = moment(startDate, "YYYY-MM-DD HH:mm ZZ");
	const _endDate = moment(endDate, "YYYY-MM-DD HH:mm ZZ");

	useInterval(() => {
		const currentTime = moment().unix();
		const now = moment();
		const _diffTime = {};

		if (currentTime < moment(startDate).unix()) {
			_diffTime.days = _startDate.diff(now, "days");
			_diffTime.times = _startDate.diff(now);
		} else if (isDateRange(startDate, endDate)) {
			_diffTime.days = _endDate.diff(now, "days");
			_diffTime.times = _endDate.diff(now);
		} else if (moment(_endDate).unix() > currentTime) {
			_diffTime.days = now.diff(_endDate, "days");
			_diffTime.times = now.diff(_endDate);
		} else {
			setCountTime(null);
		}

		setDiffTime(_diffTime);
	}, countTime);

	return <Countdown t={t} diffTime={diffTime} />;
};

const Countdown = ({ t, diffTime }) => {
	let diffTimes = 0;
	let diffDays = 0;

	if (diffTime?.times || diffTime?.days) {
		diffTimes = Math.abs(diffTime?.times);
		diffDays = Math.abs(diffTime?.days);
	}

	const duration = moment.duration(diffTimes);

	const padStartFormater = str => String(str).padStart(2, 0);

	const hours = padStartFormater(duration.hours());
	const minutes = padStartFormater(duration.minutes());
	// const seconds = padStartFormater(duration.seconds());

	if (diffTime === 0) return null;

	return (
		<div className="worldcupTime">
			<div className="title">
				<img
					src={`${bannerImgUrl}/img/worldcup/xs-logo-d.png`}
					alt="countdown_img"
				/>
			</div>
			<div className="time">
				<p>{diffDays ?? "00"}</p>
				<p>{t("lbl_Header_olympic_countdown_days")}</p>
			</div>
			<div className="time">
				<p>{hours}</p>
				<p>{t("lbl_Header_olympic_countdown_hour")}</p>
			</div>
			<div className="time">
				<p>{minutes}</p>
				<p>{t("lbl_Header_olympic_countdown_mins")}</p>
			</div>
			{/* <div className="time">
					{seconds[0]}
					{seconds[1]}
					<p>{t("lbl_Header_olympic_countdown_secs")}</p>
				</div> */}
		</div>
	);
};

Countdown.defaultProps = {
	diffTime: null
};

Countdown.propTypes = {
	t: PropTypes.func.isRequired,
	diffTime: PropTypes.objectOf(PropTypes.any)
};
