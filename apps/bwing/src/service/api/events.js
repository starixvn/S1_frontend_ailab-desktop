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

export const api_events_CheckDrawPrize = ({ eventId }) =>
	eventsRequest.post("/CheckDrawPrize", { eventId });

export const api_events_DrawPrize = ({ eventId }) =>
	eventsRequest.post("/DrawPrize", { eventId });

export const api_events_GetCustDrawPrizeList = ({ eventId }) =>
	eventsRequest.post("/GetCustDrawPrizeList", { eventId });

export const api_events_GetDisplayDrawPrizeList = ({ eventId }) =>
	eventsRequest.post("/GetDisplayDrawPrizeList", { eventId });
