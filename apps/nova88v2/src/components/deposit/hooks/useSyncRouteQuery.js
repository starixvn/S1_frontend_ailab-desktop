import { useEffect } from "react";

const useSyncRouteQuery = queryOptions => {
	const { pathname, search } = window.location;
	const queryOptionsJsonString = JSON.stringify(queryOptions);

	const replaceQuery = query =>
		window.history.replaceState({}, "", `${pathname}?${query}`);

	useEffect(() => {
		const queryOptionsObject = JSON.parse(queryOptionsJsonString);
		const queryOptionsKeys = Object.keys(queryOptionsObject).filter(key =>
			Boolean(queryOptionsObject[key])
		);

		if (queryOptionsKeys.length === 0) return;

		const searchParams = new URLSearchParams();

		queryOptionsKeys.forEach(key => {
			searchParams.set(key, queryOptionsObject[key]);
		});

		if (
			`${pathname}${search}` !== `${pathname}?${searchParams.toString()}`
		) {
			replaceQuery(searchParams.toString());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryOptionsJsonString]);
};

export { useSyncRouteQuery };
