import { newsRequest } from "./base";

export const api_news_GetNews = ({
	langId,
	PageNumber,
	PageSize,
	currencyId
}) =>
	newsRequest.post(`/GetNews/${langId}`, {
		PageNumber,
		PageSize,
		currencyId
	});

export const api_news_GetNewsById = ({ langId, NewsId, currencyId }) =>
	newsRequest.post(`/GetNewsById/${langId}`, {
		NewsId,
		currencyId
	});
