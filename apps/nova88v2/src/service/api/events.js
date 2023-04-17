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

export const GetLeaderboardListMonth = ({
	lBCategoryId,
	TopNum,
	SelectDays,
	EventCode
}) =>
	eventsRequest.post("/GetLeaderboardListMonth", {
		lBCategoryId,
		TopNum,
		SelectDays,
		EventCode
	});

export const GetCustRankMonth = ({ LBCategoryId, SelectDays, EventCode }) =>
	eventsRequest.post("/GetCustRankMonth", {
		LBCategoryId,
		SelectDays,
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
