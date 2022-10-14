import { gameRequest } from "./base";

export const api_game_GetSlotGamePage = () =>
	gameRequest.post("/GetSlotGamePage", { DeviceType: 1 });
