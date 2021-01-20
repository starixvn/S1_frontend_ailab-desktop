import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// new Date(2020,8,20,8).toUTCString();
// const endDate = new Date("Sun, 20 Sep 2020 01:00:00 GMT");
const endDate = new Date("Sun, 20 Sep 2019 01:00:00 GMT");

export default () => {
	const { t } = useTranslation();
	const [time, setTime] = useState(null);
	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		if (isMountedRef.current) {
			Timer();
		}
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	const Timer = () => {
		if (isMountedRef.current) {
			const now = new Date();
			const diff = endDate.getTime() - now.getTime();
			if (diff >= 0) {
				setTime(diff);
				setTimeout(Timer, 1000);
			} else {
				setTime(null);
			}
		}
	};

	if (time === null) {
		return <></>;
	}
	const millisecondPerDay = 1000 * 60 * 60 * 24;
	const millisecondPerHour = 1000 * 60 * 60;
	const millisecondPerMinute = 1000 * 60;

	const seconds = Math.floor((time % millisecondPerMinute) / 1000);
	const minutes = Math.floor(
		(time % millisecondPerHour) / millisecondPerMinute
	);
	const hours = Math.floor((time % millisecondPerDay) / millisecondPerHour);
	const days = Math.floor(time / millisecondPerDay);

	return (
		<div className="countdown">
			<div className="DAYS">
				<div>{days}</div>
				<div>{t("lbl_Days")}</div>
			</div>
			<div className="HOURS">
				<div>{hours}</div>
				<div>{t("lbl_Hours")}</div>
			</div>
			<div className="MINUTES">
				<div>{minutes}</div>
				<div>{t("lbl_Minutes")}</div>
			</div>
			<div className="SECONDS">
				<div>{seconds}</div>
				<div>{t("lbl_Seconds")}</div>
			</div>
		</div>
	);
};
