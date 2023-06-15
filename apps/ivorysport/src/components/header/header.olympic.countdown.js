import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { isDateRange } from "../common/common";
import useInterval from "../hook/useInterval";
import olympicCountdownImg from "../../styles/img/olympic_countdown_img.png";

const OLYMPIC_DURATION_TIME = {
	startDate: "Fri, 23 Jul 2021 20:00:00 GMT+0800",
	endDate: "Sun, 08 Aug 2021 22:59:59 GMT+0800"
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
		<div className="countdown">
			<img src={olympicCountdownImg} alt="olympic_countdown_img" />
			<div>
				<div>{days[0]}</div>
				<div>{days[1]}</div>
				<div>{t("lbl_Header_olympic_countdown_days")}</div>
			</div>
			<div>
				<div>{hours[0]}</div>
				<div>{hours[1]}</div>
				<div>{t("lbl_Header_olympic_countdown_hour")}</div>
			</div>
			<div>
				<div>{minutes[0]}</div>
				<div>{minutes[1]}</div>
				<div>{t("lbl_Header_olympic_countdown_mins")}</div>
			</div>
			<div>
				<div>{seconds[0]}</div>
				<div>{seconds[1]}</div>
				<div>{t("lbl_Header_olympic_countdown_secs")}</div>
			</div>
		</div>
	);
};

OlympicCountdown.propTypes = {
	t: PropTypes.func.isRequired,
	diffTime: PropTypes.number.isRequired
};
