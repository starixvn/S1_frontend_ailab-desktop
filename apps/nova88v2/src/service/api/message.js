import { messageRequest } from "./base";

export const api_message_GetAnnouncement = ({ langId, currencyId }) =>
	messageRequest.post(`/GetAnnouncement/${langId}`, {
		currencyId
	});
