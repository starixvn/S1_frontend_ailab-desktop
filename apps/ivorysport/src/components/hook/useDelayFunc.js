import { useRef, useEffect } from "react";

const useDelayFunc = () => {
	const refId = useRef();

	useEffect(() => {
		refId.current = null;
	}, []);

	function tick() {
		refId.current = null;
	}

	const throttle = (callback, delay) => {
		if (delay === 0) {
			callback();
		} else if (!refId.current) {
			callback();

			refId.current = setTimeout(tick, delay);
		}
	};

	return { throttle };
};

export default useDelayFunc;
