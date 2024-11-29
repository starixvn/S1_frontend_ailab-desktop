import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { defPopBoxType } from "../common/popBox";
import { defDrawPrizeStatus } from "./mysteryBox.def";
import { popBoxContext } from "../common/context";

// import imgBoxClose from "../../styles/img/event/box/box_close.png";
// import imgBoxOpen from "../../styles/img/event/box/box_open.png";

const getDiffTime = () => {
	const eventTime = moment().set({ hour: 23, minute: 59, second: 59 }).unix();
	const currentTime = moment().unix();
	const diffTime = eventTime - currentTime;

	return diffTime;
};

const MysteryBoxAnimation = ({
	isLogin,
	drawPrize,
	checkDrawPrize,
	postDrawPrize
}) => {
	const timerRef = useRef(null);
	const [downDiffTime, setDownDiffTime] = useState(getDiffTime());
	const [angpowActive, setAngpowActive] = useState(false);

	const { setPopBox } = useContext(popBoxContext);

	const { isJoin, drawOut, notEligible } = defDrawPrizeStatus;
	// const _canJoin = drawPrize.errorCode === canJoin;
	const _isJoin = drawPrize.errorCode === isJoin;
	const _drawOut = drawPrize.errorCode === drawOut;
	const _notEligible = drawPrize.errorCode === notEligible;

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

	const onPostDrawPrize = async () => {
		if (!isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
			return;
		}
		if (_isJoin || _drawOut || _notEligible || angpowActive) return;

		setAngpowActive(true);
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

	return (
		<div className="animation" onClick={onPostDrawPrize}>
			<div className="goldbox__wrapper">
				<div
					className={`goldbox__item${angpowActive ? " active" : ""}`}>
					<div
						className={`time${
							isLogin && (_isJoin || _drawOut) ? " active" : ""
						}`}>
						{secondsToTime(downDiffTime)}
					</div>
					{/* <img
						className={`goldbox__item__close${
							angpowActive ? " active" : ""
						}`}
						src={imgBoxClose}
						alt=""
					/>
					<img
						className={`goldbox__item__open${
							angpowActive ? " active" : ""
						}`}
						src={imgBoxOpen}
						alt=""
					/> */}
				</div>
			</div>
		</div>
	);
};

MysteryBoxAnimation.propTypes = {
	isLogin: PropTypes.bool.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	postDrawPrize: PropTypes.func.isRequired
};
export default MysteryBoxAnimation;
