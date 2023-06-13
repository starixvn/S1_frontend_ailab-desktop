import { useState, useEffect, useRef } from "react";
import moment from "moment";

const getDiffTime = () => {
	const eventTime = moment().set({ hour: 23, minute: 59, second: 59 }).unix();
	const currentTime = moment().unix();
	const diffTime = eventTime - currentTime;

	return diffTime;
};

const useCountdown = ({
	initialTime = 0,
	isRepeat = false,
	isStart = true,
	callBack
}) => {
	const timerRef = useRef(null);
	const [diffTimeCount, setDiffTimeCount] = useState(initialTime);
	useEffect(() => {
		const startTimer = () => {
			setDiffTimeCount(initialTime);

			timerRef.current = setInterval(() => {
				setDiffTimeCount(prev => {
					if (prev - 1 === 0 && timerRef.current) {
						callBack();
						cleanTimer();

						if (isRepeat) {
							startTimer();
						}
					}

					return prev - 1;
				});
			}, 1000);
		};

		const cleanTimer = () => {
			clearInterval(timerRef.current);
			timerRef.current = null;
		};

		isStart ? startTimer() : cleanTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isStart, isRepeat, initialTime]);

	return { diffTimeCount };
};

export { getDiffTime, useCountdown };
