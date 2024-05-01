import { eventsRequest } from "./base";

export const api_events_GetLeaderboardList = async ({
	lBCategoryId = 0,
	TopNum = 10,
	BeforeDays = 0,
	EventCode
}) => {
	try {
		return await eventsRequest.post(`/GetLeaderboardList/`, {
			lBCategoryId,
			TopNum,
			BeforeDays,
			EventCode
		});
	} catch (e) {
		return {
			data: {
				data: [],
				errorCode: 0
			}
		};
	}
};

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
