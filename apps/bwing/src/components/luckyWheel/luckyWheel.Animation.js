import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { defPopBoxType } from "../common/defPopBoxType";
import { defDrawPrizeStatus } from "../hook/useDrawPrizeFetcher";
import { useCountdown, getDiffTime } from "../hook/useCountdown";
import { bannerImgUrl } from "../../config";

const CORRECTION_DEG = 3;
const UNIT_DEG = -22.5;

const LuckyWheelAnimation = ({
	displayDrawPrizeList,
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
		<div className="luckyout">
			<img
				src={`${bannerImgUrl}/desktop/img/luckybox/pin.png`}
				alt="img-pin"
				className="pin"
			/>
			<img
				src={`${bannerImgUrl}/desktop/img/luckybox/spin.png`}
				alt="img-spin"
			/>

			<button className="wheelbox" onClick={drawPrizeHandler}>
				<img
					src={`${bannerImgUrl}/desktop/img/luckybox/spingo.png`}
					alt="img-button"
				/>
			</button>

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
	isLogin: PropTypes.bool.isRequired,
	drawPrize: PropTypes.objectOf(PropTypes.any).isRequired,
	onPostDrawPrize: PropTypes.func.isRequired,
	openPrizePopBox: PropTypes.func.isRequired,
	checkDrawPrize: PropTypes.func.isRequired,
	errorPopBox: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired
};
export default LuckyWheelAnimation;
