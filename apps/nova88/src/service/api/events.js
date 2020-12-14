import { eventsRequest } from "./base";

export const api_events_GetLeaderboardList = ({
	lBCategoryId,
	TopNum,
	BeforeDays
}) =>
	eventsRequest.post("/GetLeaderboardList", {
		lBCategoryId,
		TopNum,
		BeforeDays
	});

export const api_events_GetCustRank = ({ lBCategoryId, BeforeDays }) =>
	eventsRequest.post("/GetCustRank", {
		lBCategoryId,
		BeforeDays
	});
