import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { isDateRange } from "../common/common";
import useInterval from "../hook/useInterval";
// import olympicCountdownImg from "../../styles/img/olympics/logo.png";

const OLYMPIC_DURATION_TIME = {
	startDate: "Fri, 23 Jul 2021 19:00:00 GMT+0700",
	endDate: "Sun, 08 Aug 2021 21:59:59 GMT+0700"
};

export default () => {
	const { t } = useTranslation();

	const [diffTime, setDiffTime] = useState(0);
	const [countTime, setCountTime] = useState(1000);

	const { startDate, endDate } = OLYMPIC_DURATION_TIME;

	useInterval(() => {
		const currentTime = moment().unix();

		let _diffTime = 0;

		if (currentTime < moment(startDate).unix()) {
			_diffTime = moment(startDate).unix() - currentTime;
		} else if (isDateRange(startDate, endDate)) {
			_diffTime = moment(endDate).unix() - currentTime;
		} else {
			setCountTime(null);
		}

		setDiffTime(_diffTime);
	}, countTime);

	return <OlympicCountdown t={t} diffTime={diffTime} />;
};

const OlympicCountdown = ({ t, diffTime }) => {
	const duration = moment.duration(diffTime, "seconds");

	const padStartFormater = str => String(str).padStart(2, 0);

	const days = padStartFormater(duration.days());
	const hours = padStartFormater(duration.hours());
	const minutes = padStartFormater(duration.minutes());
	const seconds = padStartFormater(duration.seconds());

	if (diffTime === 0) return null;

	return (
		<div className="olympicsTime">
			<div className="title">
				{/* <img src={olympicCountdownImg} alt="olympic_countdown_img" /> */}
				<p>
					TOKYO <br /> 2020
				</p>
			</div>
			<div className="time">
				<p>{days}</p>
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
			<div className="time">
				<p>{seconds}</p>
				<p>{t("lbl_Header_olympic_countdown_secs")}</p>
			</div>
		</div>
	);
};

OlympicCountdown.propTypes = {
	t: PropTypes.func.isRequired,
	diffTime: PropTypes.number.isRequired
};
