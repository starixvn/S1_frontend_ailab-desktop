import React, { useState, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { defPopBoxType } from "../common/popBox";
import { defDrawPrizeStatus } from "../hook/useDrawPrizeFetcher";
import { useCountdown, getDiffTime } from "../hook/useCountdown";

import wheel from "../../styles/img/event/wheel/wheel.png";
import chips_l from "../../styles/img/event/wheel/chips_l.png";
import chips_r from "../../styles/img/event/wheel/chips_r.png";

import spinbtn_en from "../../styles/img/event/wheel/spinbtn_en.png";
import spinbtn_vn from "../../styles/img/event/wheel/spinbtn_vn.png";

const CORRECTION_DEG = 3;
const UNIT_DEG = -22.5;

const LuckyWheelAnimation = ({
	displayDrawPrizeList,
	langId,
	isLogin,
	drawPrize,
	onPostDrawPrize,
	openPrizePopBox,
	checkDrawPrize,
	errorPopBox,
	setPopBox
}) => {
	const [animationActive, setAnimationActive] = useState(false);
	const [diffTime] = useState(getDiffTime());

	const imgButton = {
		en: spinbtn_en,
		vn: spinbtn_vn
	}[langId];

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
			<img src={wheel} alt="img-wheel" />
			<img className="chipL" src={chips_l} alt="img-chips_l" />
			<img className="chipR" src={chips_r} alt="img-chips_r" />

			{imgButton && (
				<button onClick={drawPrizeHandler}>
					<img src={imgButton} alt="img-button" />
				</button>
			)}

			<div className={className} style={{ transform }}>
				<ul>
					{displayDrawPrizeList.map(item => (
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
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	onPostDrawPrize: PropTypes.func.isRequired,
	openPrizePopBox: PropTypes.func.isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	errorPopBox: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};
export default LuckyWheelAnimation;
