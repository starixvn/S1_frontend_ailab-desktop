import { eventsRequest } from "./base";

export const api_events_GetLeaderboardListV2 = ({
	lBCategoryId,
	TopNum,
	BeforeDays,
	EventCode
}) =>
	eventsRequest.post("/GetLeaderboardListV2", {
		lBCategoryId,
		TopNum,
		BeforeDays,
		EventCode
	});

export const api_events_GetCustRankV2 = ({
	LBCategoryId,
	BeforeDays,
	EventCode
}) =>
	eventsRequest.post("/GetCustRankV2", {
		LBCategoryId,
		BeforeDays,
		EventCode
	});
