import { eventsRequest } from "./base";

// export const api_events_GetLeaderboardList = ({
// 	lBCategoryId,
// 	TopNum,
// 	BeforeDays
// }) =>
// 	eventsRequest.post("/GetLeaderboardList", {
// 		lBCategoryId,
// 		TopNum,
// 		BeforeDays
// 	});

// export const api_events_GetCustRank = ({ LBCategoryId, BeforeDays }) =>
// 	eventsRequest.post("/GetCustRank", {
// 		LBCategoryId,
// 		BeforeDays
// 	});

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
	