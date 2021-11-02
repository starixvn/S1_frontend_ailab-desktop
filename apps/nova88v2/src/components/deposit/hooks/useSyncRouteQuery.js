import { useEffect } from "react";
import { navigate, useLocation } from "@reach/router";

const useSyncRouteQuery = queryOptions => {
	const { pathname, search } = useLocation();
	const queryOptionsJsonString = JSON.stringify(queryOptions);

	useEffect(() => {
		let hasNull = false;
		const queryOptionsObject = JSON.parse(queryOptionsJsonString);
		const queryOptionsKeys = Object.keys(queryOptionsObject).filter(key => {
			if (!queryOptionsObject[key] && !hasNull) hasNull = true;
			return Boolean(queryOptionsObject[key]);
		});

		if (queryOptionsKeys.length === 0 || hasNull) return;

		const searchParams = new URLSearchParams();

		queryOptionsKeys.forEach(key =>
			searchParams.set(key, queryOptionsObject[key])
		);

		if (`${pathname}${search}` === `${pathname}?${searchParams.toString()}`)
			return;

		navigate(`${pathname}?${searchParams.toString()}`);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryOptionsJsonString]);
};

export { useSyncRouteQuery };
