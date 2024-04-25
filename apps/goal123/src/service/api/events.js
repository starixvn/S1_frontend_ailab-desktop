import { eventsRequest } from "./base";

export const api_events_GetLeaderboardList = ({
	lBCategoryId,
	TopNum,
	BeforeDays,
	EventCode
}) =>
	eventsRequest.post("/GetLeaderboardList", {
		lBCategoryId,
		TopNum,
		BeforeDays,
		EventCode
	});


// getLeaderboardList的lBCategoryId目前一次只能帶一個所以要分開打四次 分別帶 0,1,2,3

export const api_events_GetLeaderboardListSports = payloads =>
	api_events_GetLeaderboardList({ ...payloads });

export const api_events_GetLeaderboardListSlots = payloads =>
	api_events_GetLeaderboardList({ ...payloads });

export const api_events_GetLeaderboardListLiveCasino = payloads =>
	api_events_GetLeaderboardList({ ...payloads });

export const api_events_GetCustRank = ({
	LBCategoryId,
	BeforeDays,
	EventCode
}) =>
	eventsRequest.post("/GetCustRank", {
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
