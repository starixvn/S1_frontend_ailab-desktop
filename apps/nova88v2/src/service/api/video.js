import { videoRequest } from "./base";

export const api_video_GetLiveStreamingList = langId =>
	videoRequest.post(`/GetLiveStreamingList/${langId}`);
