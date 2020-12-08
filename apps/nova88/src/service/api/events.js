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
