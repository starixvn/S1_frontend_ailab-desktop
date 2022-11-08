import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "../common/defPopBoxType";

import { defDrawPrizeStatus } from "./angPow.def";

const getDiffTime = () => {
	const eventTime = moment().set({ hour: 23, minute: 59, second: 59 }).unix();
	const currentTime = moment().unix();
	const diffTime = eventTime - currentTime;

	return diffTime;
};

const AngPowAnimation = ({
	t,
	isLogin,
	langId,
	drawPrize,
	checkDrawPrize,
	postDrawPrize
}) => {
	const timerRef = useRef(null);
	const [downDiffTime, setDownDiffTime] = useState(getDiffTime());
	const [angpowActive, setAngpowActive] = useState(false);

	const { setPopBox } = usePopBox();

	const { isJoin, drawOut, notEligible } = defDrawPrizeStatus;
	// const _canJoin = drawPrize.errorCode === canJoin;
	const _isJoin = drawPrize.errorCode === isJoin;
	const _drawOut = drawPrize.errorCode === drawOut;
	const _notEligible = drawPrize.errorCode === notEligible;

	const secondsToTime = secondsInTime => {
		const pad = (num, size) => `000${num}`.slice(size * -1);
		const time = parseFloat(secondsInTime).toFixed(3);
		const hours = Math.floor(time / 60 / 60);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		// const milliseconds = time.slice(-3);
		return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
	};

	const onPostDrawPrize = async () => {
		if (!isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
			return;
		}

		if (_isJoin || _drawOut || _notEligible || angpowActive) return;

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		setAngpowActive(true);

		await delay(3000);

		await postDrawPrize();

		setAngpowActive(false);
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			const startTimer = () => {
				setDownDiffTime(getDiffTime());

				timerRef.current = setInterval(() => {
					setDownDiffTime(prev => {
						if (prev - 1 === 0 && timerRef.current) {
							checkDrawPrize();
							clearInterval(timerRef.current);
							timerRef.current = null;
						}

						return prev - 1;
					});
				}, 1000);
			};

			if (_isJoin || _drawOut) {
				clearInterval(timerRef.current);
				startTimer();
			}
		}

		return () => {
			clearInterval(timerRef.current);
			isMounted = false;
		};
	}, [drawPrize.errorCode, _isJoin, _drawOut, checkDrawPrize]);

	// const eventTextImg = langId === "id" ? imgTextID : imgTextEN;
	return (
		<div className="animation" onClick={onPostDrawPrize}>
			<div className={`angpao${angpowActive ? " active" : ""}`}>
				{/* {_isJoin || _drawOut ? null : (
					<img
						src={eventTextImg}
						alt="img-event-text-en"
						className="bigtitle"
					/>
				)} */}

				<div
					className={`box${
						isLogin && (_isJoin || _drawOut) ? " active" : ""
					}`}
				/>
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div className="coin" />
				<div
					className={`time ${
						isLogin && (_isJoin || _drawOut) ? "active" : ""
					}`}>
					{t("lbl_Next")}
					<div>{secondsToTime(downDiffTime)}</div>
				</div>
			</div>
		</div>
	);
};

AngPowAnimation.propTypes = {
	t: PropTypes.func.isRequired,
	isLogin: PropTypes.bool.isRequired,
	langId: PropTypes.string.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	postDrawPrize: PropTypes.func.isRequired
};
export default AngPowAnimation;
