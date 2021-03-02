import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
// import usePopBox from "../hook/usePopBox";
// import defPopBoxType from "../common/defPopBoxType";
import { defPopBoxType } from "../common/popBox";
import { defDrawPrizeStatus } from "./angPow.def";
import { popBoxContext } from "../common/context";
import imgWordVN from "../../styles/img/event/word_vn.png";
import imgWordEN from "../../styles/img/event/word_en.png";

const getDiffTime = () => {
	const eventTime = moment().set({ hour: 23, minute: 59, second: 59 }).unix();
	const currentTime = moment().unix();
	const diffTime = eventTime - currentTime;

	return diffTime;
};

const AngPowAnimation = ({
	// t,
	isLogin,
	langId,
	drawPrize,
	checkDrawPrize,
	postDrawPrize
}) => {
	const timerRef = useRef(null);
	const [downDiffTime, setDownDiffTime] = useState(getDiffTime());
	const [angpowActive, setAngpowActive] = useState(false);

	// const { setPopBox } = usePopBox();
	const { setPopBox } = useContext(popBoxContext);

	const { canJoin, isJoin, drawOut, notEligible } = defDrawPrizeStatus;
	const _canJoin = drawPrize.errorCode === canJoin;
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

	const eventTextImg = langId === "vn" ? imgWordVN : imgWordEN;

	return (
		<div className="animation" onClick={onPostDrawPrize}>
			<div className="angpao__wrapper">
				<div className={`angpao${angpowActive ? " active" : ""}`}>
					{_isJoin || _drawOut ? null : (
						<img
							src={eventTextImg}
							alt="bigtitle"
							className="bigtitle"
						/>
					)}
					<div
						className={`time ${
							isLogin && (_isJoin || _drawOut) ? "active" : ""
						}`}>
						{secondsToTime(downDiffTime)}
					</div>
					<img
						className="angpao__bg"
						src={require(`../../styles/img/event/angpao.png`)}
						alt="angpao__bg"
					/>
					<img
						className="angpao__cover"
						src={require(`../../styles/img/event/angpao_cover.png`)}
						alt="angpao__cover"
					/>
					<div className="element">
						<img
							className="element__coin__right"
							src={require(`../../styles/img/event/angpao_02.png`)}
							alt="element__coin__right"
						/>
						<img
							className="element__coin__left"
							src={require(`../../styles/img/event/angpao_03.png`)}
							alt="element__coin__left"
						/>
						<img
							className="element__red"
							src={require(`../../styles/img/event/angpao_04.png`)}
							alt="element__red"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

AngPowAnimation.propTypes = {
	// t: PropTypes.func.isRequired,
	isLogin: PropTypes.bool.isRequired,
	langId: PropTypes.string.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	postDrawPrize: PropTypes.func.isRequired
};
export default AngPowAnimation;
