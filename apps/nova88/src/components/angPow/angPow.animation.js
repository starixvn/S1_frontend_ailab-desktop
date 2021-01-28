import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { defDrawPrizeStatus } from "./angPow.def";

const eventTime = moment().set({ hour: 24, minute: 59, second: 59 }).unix();
const currentTime = moment().unix();
const diffTime = eventTime - currentTime;

const AngPowAnimation = ({
	t,
	isLogin,
	drawPrize,
	checkDrawPrize,
	postDrawPrize
}) => {
	const timerRef = useRef(null);
	const [downDiffTime, setDownDiffTime] = useState(diffTime);

	const startTimer = () => {
		timerRef.current = setInterval(() => {
			setDownDiffTime(prev => {
				if (prev - 1 === 0 && timerRef.current) {
					clearInterval(timerRef.current);
					timerRef.current = null;
				}
				if (prev - 1 === 0) {
					checkDrawPrize();
				}

				return prev - 1;
			});
		}, 1000);
	};

	const secondsToTime = secondsInTime => {
		const pad = (num, size) => {
			return `000${num}`.slice(size * -1);
		};
		const time = parseFloat(secondsInTime).toFixed(3);
		const hours = Math.floor(time / 60 / 60);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		// const milliseconds = time.slice(-3);
		return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
	};

	useEffect(() => {
		if (drawPrize.errorCode === defDrawPrizeStatus.isJoin) {
			clearInterval(timerRef.current);
			startTimer();
		}
		return () => {
			clearInterval(timerRef.current);
		};
	});

	return (
		<div className="animation">
			<div className="angpao" onClick={postDrawPrize}>
				{!isLogin ||
				drawPrize.errorCode === defDrawPrizeStatus.canJoin ? (
					<img
						src={require(`../../styles/img/event/text_en.png`)}
						alt="img-event-text-en"
						className="bigtitle"
					/>
				) : null}

				<div className="box" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div
					className={`time ${
						isLogin &&
						drawPrize.errorCode === defDrawPrizeStatus.isJoin
							? "active"
							: ""
					}`}>
					{t("lbl_AngPow_Next")}
					<div>{secondsToTime(downDiffTime)}</div>
				</div>
			</div>
		</div>
	);
};

AngPowAnimation.propTypes = {
	t: PropTypes.func.isRequired,
	isLogin: PropTypes.bool.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	postDrawPrize: PropTypes.func.isRequired
};
export default AngPowAnimation;
