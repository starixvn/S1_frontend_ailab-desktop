import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import defPopBoxType from "../common/defPopBoxType";
import { defDrawPrizeStatus } from "../hook/useDrawPrizeFetcher";
import { useCountdown, getDiffTime } from "../hook/useCountdown";

import wheelcover from "../../styles/img/event/wheel/wheelcover.png";
import wheelbtn from "../../styles/img/event/wheel/wheelbtn.png";

const CORRECTION_DEG = 3;
const UNIT_DEG = -22.5;

const LuckyWheelAnimation = ({
	displayDrawPrizeList,
	isLogin,
	drawPrize,
	openPrizePopBox,
	onPostDrawPrize,
	checkDrawPrize,
	errorPopBox,
	setPopBox
}) => {
	const [diffTime] = useState(getDiffTime());
	const [animationActive, setAnimationActive] = useState(false);
	const transform = useMemo(() => {
		const isWinPrize = item => item.prizeId === drawPrize.data.prizeId;
		let prizeIndex = displayDrawPrizeList.findIndex(isWinPrize);

		prizeIndex = prizeIndex === -1 ? 0 : prizeIndex;

		return `rotate(${UNIT_DEG * (prizeIndex - CORRECTION_DEG)}deg)`;
	}, [displayDrawPrizeList, drawPrize.data.prizeId]);

	const className = ["wheel", animationActive && "active"]
		.filter(Boolean)
		.join(" ");

	const drawPrizeHandler = async () => {
		if (!isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
			return;
		}

		if (animationActive) return;

		if (drawPrize.errorCode === defDrawPrizeStatus.isJoin) {
			openPrizePopBox(
				drawPrize.data.prizeName,
				defDrawPrizeStatus.isJoin
			);
			return;
		}

		if (
			drawPrize.errorCode === defDrawPrizeStatus.drawOut ||
			drawPrize.errorCode === defDrawPrizeStatus.notEligible
		) {
			errorPopBox(
				drawPrize.message || `[${drawPrize.errorCode}] error`,
				drawPrize.errorCode
			);
			return;
		}

		setAnimationActive(true);

		await onPostDrawPrize();

		setAnimationActive(false);
	};

	const isJoin = drawPrize.errorCode === defDrawPrizeStatus.isJoin;
	const drawOut = drawPrize.errorCode === defDrawPrizeStatus.drawOut;

	useCountdown({
		initialTime: diffTime,
		isRepeat: true,
		isStart: isJoin || drawOut,
		callBack: checkDrawPrize
	});

	return (
		<div className="wheelModule">
			<img src={wheelcover} alt="lucky-wheel-img-wheelcover" />

			<button onClick={drawPrizeHandler}>
				<img src={wheelbtn} alt="lucky-wheel-img-wheelbtn" />
			</button>

			<div className={className} style={{ transform }}>
				<ul>
					{displayDrawPrizeList.map(item => (
						// eslint-disable-next-line react/no-array-index-key
						<li key={`item-key-${item.index}`}>
							<p>{item.prizeName}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

LuckyWheelAnimation.propTypes = {
	displayDrawPrizeList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isLogin: PropTypes.bool.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	openPrizePopBox: PropTypes.func.isRequired,
	onPostDrawPrize: PropTypes.func.isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	errorPopBox: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};
export default LuckyWheelAnimation;
