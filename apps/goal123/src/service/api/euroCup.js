import { cupEventRequest } from "./base";

export const api_cupEvent_GetCupEventPredictionSetting = ({ langId }) =>
	cupEventRequest.post(`/GetCupEventPredictionSetting`, {
		LangId: langId
	});

export const api_cupEvent_GetCupEventTicket = () =>
	cupEventRequest.post(`/GetCupEventTicket`);

export const api_cupEvent_GetMemberDeposit = () =>
	cupEventRequest.post(`/GetMemberDeposit`);

export const api_cupEvent_GetCupEventTicketSummary = () =>
	cupEventRequest.post(`/GetCupEventTicketSummary`);

export const api_cupEvent_MultiUserPollTickets = ({ userPollTicket, count }) =>
	cupEventRequest.post(`/MultiUserPollTickets`, {
		UserPollTicket: userPollTicket,
		count
	});
