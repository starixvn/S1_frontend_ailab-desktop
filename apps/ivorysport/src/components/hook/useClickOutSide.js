import { useEffect, useRef } from "react";

const useClickOutside = handler => {
	const domRef = useRef(null);

	useEffect(() => {
		const eventHandler = event => {
			if (!domRef.current.contains(event.target)) {
				handler();
			}
		};

		document.addEventListener("mousedown", eventHandler);
		return () => {
			document.removeEventListener("mousedown", eventHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return domRef;
};

export default useClickOutside;
