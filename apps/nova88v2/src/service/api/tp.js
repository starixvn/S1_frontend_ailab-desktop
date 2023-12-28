import { tpRequest, defDeviceType } from "./base";

export const api_tp_GetTransferHistory = ({ StartDate, EndDate, PageNumber }) =>
	tpRequest.post("/GetTransferHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_tp_GetTransferRecent = () =>
	tpRequest.post("/GetTransferRecent");

export const api_tp_Transfer = ({ TpId, amount, direction }) =>
	tpRequest.post("/Transfer", {
		TpId,
		amount,
		direction
	});

export const api_tp_TransferEx = ({
	FromTpId,
	ToTpId,
	Amount,
	TransferAction,
	LangId
}) =>
	tpRequest.post("/TransferEX", {
		FromTpId,
		ToTpId,
		Amount,
		TransferAction,
		LangId
	});

export const defGotoGame_AppType = defDeviceType;

export const api_tp_GotoGame = ({
	gameId = null,
	TpId,
	LangId,
	AppType = defDeviceType.Desktop,
	fun = null,
	gameType = "",
	tpGameType,
	loginGameType
}) =>
	tpRequest.post("/GotoGame", {
		TpId,
		LangId,
		AppType,
		inputs: {
			gameId,
			fun,
			gameType,
			tpGameType,
			loginGameType
		}
	});
