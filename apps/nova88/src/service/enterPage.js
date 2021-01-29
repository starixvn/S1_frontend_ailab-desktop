import config from "../config";
import path from "../router";

export const _ACTION_TYPE = {
	blank: 1,
	redirect: 2
};

export const SET_CASINO_ENTER_PAGE = (tpId, gameId, isFree, langId) => {
	if (typeof window !== `undefined`) {
		const appUrl = window.location.origin;
		const homeUrl = `${appUrl}`;
		const signupUrl = `${appUrl}/${path.join.root}`;
		const LoginUrl = `${appUrl}/${path.login.root}`;
		const entPageUrl = `${config.openURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}`;
		window
			.open(
				`${entPageUrl}&fun=${isFree ? 1 : 0}&gameType=slots`,
				`Tp_${tpId}`,
				"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
			)
			.focus();
	}
};

export const SET_ENTER_PAGE = ({
	langId,
	tpId,
	gameId,
	matchid,
	isLogin,
	loginCallback,
	betType,
	openInBlank = false
}) => {
	const result = GET_OPEN_RULE(langId, tpId, gameId, matchid, betType);
	if (!isLogin && result.needLogin) {
		loginCallback();
	} else if (result.actionType === _ACTION_TYPE.blank || openInBlank) {
		OPEN_IN_BLANK(result.entPageUrl, result.windowKey);
	} else if (result.actionType === _ACTION_TYPE.redirect) {
		if (typeof window !== `undefined`) {
			window.location.href = result.entPageUrl;
		}
	}
};

export const OPEN_IN_BLANK = (url, windowKey) => {
	if (typeof window !== `undefined`) {
		window.open(
			url,
			windowKey,
			"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
		);
	}
};

export const GET_OPEN_RULE = (langId, tpId, gameId, matchid, betType) => {
	const _tpId = isNaN(tpId) ? tpId : Number(tpId);
	const _gameId = isNaN(gameId) ? gameId : Number(gameId);
	let result = setResult("", true, _ACTION_TYPE.blank);
	if (_tpId === 1) {
		if (_gameId === 43 || _gameId === 220 || _gameId === 202) {
			result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
		} else if (_gameId < 100) {
			result = setResult(
				"",
				false,
				_ACTION_TYPE.redirect,
				_tpId,
				_gameId
			);
		} else if (_gameId === 161 || _gameId === 180) {
			result = setResult(
				"",
				false,
				_ACTION_TYPE.redirect,
				_tpId,
				_gameId
			);
		} else if (_gameId >= 200) {
			result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
		}
	} else {
		result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
	}

	return {
		...result,
		entPageUrl: GET_ENTER_PAGE_URL(langId, _tpId, _gameId, matchid, betType)
	};
};

export const GET_ENTER_PAGE_URL = (langId, tpId, gameId, matchid, betType) => {
	const appUrl =
		typeof window !== `undefined` ? window.location.origin : null;
	const homeUrl = `${appUrl}`;
	const signupUrl = `${appUrl}/${path.join.root}`;
	const LoginUrl = `${appUrl}/${path.login.root}`;
	const lobbyUrl = ``;
	const cashierUrl = `${appUrl}/${path.deposit.root}`;
	const _matchid = matchid || "";
	const _betType = betType ? `&betType=${betType}` : "";
	return `${config.openURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}&CashierUrl=${cashierUrl}&LobbyUrl=${lobbyUrl}&matchid=${_matchid}${_betType}`;
};

const setResult = (url, needLogin, actionType, tpId, gameId, matchid) => {
	return {
		url,
		needLogin,
		actionType,
		windowKey: tpId === 1 ? `Tp_${tpId}_${gameId}` : `Tp_${tpId}`
	};
};
