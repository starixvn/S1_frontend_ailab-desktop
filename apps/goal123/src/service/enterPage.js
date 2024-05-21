/* eslint-disable no-console */
import { products } from "@ailab-desktop/common";
import config, { errorPageUrl } from "../config";
import path from "../router";

export const _ACTION_TYPE = {
	blank: 1,
	redirect: 2
};

export const SET_CASINO_ENTER_PAGE = ({
	tpId,
	gameId,
	isFree,
	langId,
	execFunction,
	tpGameType
}) => {
	if (typeof window !== `undefined`) {
		if (execFunction) {
			execFunction();
		} else {
			const appUrl = window.location.origin;
			const homeUrl = `${appUrl}`;
			const signupUrl = `${appUrl}/${path.join.root}`;
			const LoginUrl = `${appUrl}/${path.login.root}`;
			const _errorPageUrl = errorPageUrl(langId);
			const _tpGameType = tpGameType ? `&tpGameType=${tpGameType}` : "";
			const entPageUrl = `${config.openURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}&errorUrl=${_errorPageUrl}${_tpGameType}`;
			const url = `${entPageUrl}&fun=${isFree ? 1 : 0}&gameType=slots`;

			// * stage 環境， log url 提供資訊 debug
			if (
				window.location.href.indexOf("stag") !== -1 ||
				window.location.href.indexOf("localhost") !== -1
			) {
				console.log("SET_CASINO_ENTER_PAGE", url);
			}

			window
				.open(
					url,
					`Tp_${tpId}`,
					"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
				)
				.focus();
		}
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
	openInBlank = false,
	tpGameType
}) => {
	const result = GET_OPEN_RULE(
		langId,
		tpId,
		gameId,
		matchid,
		betType,
		tpGameType
	);
	if (!isLogin && result.needLogin) {
		loginCallback();
	} else if (result.actionType === _ACTION_TYPE.blank || openInBlank) {
		// * stage 環境， log url 提供資訊 debug
		if (
			window.location.href.indexOf("stag") !== -1 ||
			window.location.href.indexOf("localhost") !== -1
		) {
			console.log("SET_ENTER_PAGE", result.entPageUrl);
		}
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

export const GET_OPEN_RULE = (
	langId,
	tpId,
	gameId,
	matchid,
	betType,
	tpGameType
) => {
	const _tpId = isNaN(tpId) ? tpId : Number(tpId);
	const _gameId = isNaN(gameId) ? gameId : Number(gameId);
	const _matchid = isNaN(matchid) ? matchid : Number(matchid);
	let result = setResult("", true, _ACTION_TYPE.blank);
	if (_tpId === 1) {
		if (_gameId === 43 || _gameId === 220 || _gameId === 202) {
			result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
		} else if (
			_gameId < 100 ||
			_gameId === 161 ||
			_gameId === 180 ||
			_gameId === 192
		) {
			result = setResult(
				"",
				false,
				_ACTION_TYPE.redirect,
				_tpId,
				_gameId
			);
			// result = setResult("", false, _ACTION_TYPE.blank, _tpId, _gameId);
		} else if (_gameId >= 200) {
			result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
		}
	} else if (_tpId === products.CryptoSports.tpId) {
		result = setResult("", false, _ACTION_TYPE.blank, _tpId);
	} else {
		result = setResult("", true, _ACTION_TYPE.blank, _tpId, _gameId);
	}

	return {
		...result,
		entPageUrl: GET_ENTER_PAGE_URL({
			langId,
			tpId: _tpId,
			gameId: _gameId,
			matchid: _matchid,
			betType,
			tpGameType
		})
	};
};

export const GET_ENTER_PAGE_URL = ({
	langId,
	tpId,
	gameId,
	matchid,
	betType,
	isLogin,
	tpGameType
}) => {
	const appUrl =
		typeof window !== `undefined` ? window.location.origin : null;
	const homeUrl = `${appUrl}`;
	const signupUrl = `${appUrl}/${path.join.root}`;
	const LoginUrl = `${appUrl}/${path.login.root}`;
	const lobbyUrl = ``;
	const cashierUrl = `${appUrl}/${path.deposit.root}`;
	const _matchid = matchid || "";
	const _betType = betType ? `&bettype=${betType}` : "";
	const _errorPageUrl = errorPageUrl(langId);
	const _tpGameType = tpGameType ? `&tpGameType=${tpGameType}` : "";
	let urlSpecialPattern = "";
	if (tpId === products.BtiSport.tpId || tpId === products.SBOBET.tpId) {
		urlSpecialPattern = `&gameType=sports${isLogin ? "" : "&fun=1"}`;
	}

	return `${config.openURL}/${langId}/entPage?homeUrl=${homeUrl}&signupUrl=${signupUrl}&LoginUrl=${LoginUrl}&tpId=${tpId}&gameId=${gameId}&CashierUrl=${cashierUrl}&LobbyUrl=${lobbyUrl}&matchid=${_matchid}${_betType}&errorUrl=${_errorPageUrl}${urlSpecialPattern}${_tpGameType}`;
};

const setResult = (url, needLogin, actionType, tpId, gameId, matchid) => ({
	url,
	needLogin,
	actionType,
	windowKey: tpId === 1 ? `Tp_${tpId}_${gameId}` : `Tp_${tpId}`
});
