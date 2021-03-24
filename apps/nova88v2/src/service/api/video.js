import { videoRequest } from "./base";

export const api_video_GetLiveStreamingList = langId =>
	videoRequest.post(`/GetLiveStreamingList/${langId}`);

export const api_video_GetLatestHighlightData = langId =>
	videoRequest.post(`/GetLatestHighlightData/${langId}`);
