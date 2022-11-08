import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { isDateRange } from "../common/common";
import useInterval from "../hook/useInterval";
import { bannerImgUrl } from "../../config";
import arrowImg from "../../styles/img/homepage/arrow.png";

const DURATION_TIME = {
	// startDate: "2022-07-26 12:00:00", // GMT+0800
	endDate: "2022-11-21 18:00:00 +0800" // GMT+0800
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

	const padStartFormater = str =>
		String(str).padStart(2, 0).replace("-", "0");

	const hours = padStartFormater(duration.hours());
	const minutes = padStartFormater(duration.minutes());
	const seconds = padStartFormater(duration.seconds());

	if (diffTime === 0) return null;

	return (
		<>
			<div>
				<img
					src={`${bannerImgUrl}/desktop/img/event/worldcup/fixture-logo.png`}
					alt="countdown_img"
				/>
			</div>
			<div>
				<div>
					<span>{diffDays ?? "00"}</span>
					<div>{t("lbl_Header_olympic_countdown_days")}</div>
				</div>
				<div>
					<span>
						{hours[0]}
						{hours[1]}
					</span>
					<div>{t("lbl_Header_olympic_countdown_hour")}</div>
				</div>
				<div>
					<span>
						{minutes[0]}
						{minutes[1]}
					</span>
					<div>{t("lbl_Header_olympic_countdown_mins")}</div>
				</div>
				<div>
					<span>
						{seconds[0]}
						{seconds[1]}
					</span>
					<div>{t("lbl_Header_olympic_countdown_secs")}</div>
				</div>
				<button className="entry">
					<img src={arrowImg} alt="entry" />
				</button>
			</div>
		</>
	);
};

Countdown.defaultProps = {
	diffTime: null
};

Countdown.propTypes = {
	t: PropTypes.func.isRequired,
	diffTime: PropTypes.objectOf(PropTypes.any)
};
