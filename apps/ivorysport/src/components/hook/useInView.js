import { useEffect, useRef } from "react";

const useInView = callback => {
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) {
			return;
		}

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						callback();
					}
				});
			},
			{
				rootMargin: "30px"
			}
		);

		observer.observe(ref.current);

		// eslint-disable-next-line consistent-return
		return () => observer.disconnect();
	}, [callback]);

	return ref;
};

export { useInView };
