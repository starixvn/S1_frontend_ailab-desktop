import { useEffect, useState, useCallback, useRef, useContext } from "react";
import productList from "../../datas/productList";
import { api_tp_GotoGame } from "../../service/api/tp";
import usePopBox from "./usePopBox";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";

export const defSpecialSetting = {
	playTech: productList.casino_PlayTech.tpId,
	sports_9w: productList._9WSports.tpId,
	PG: productList.casino_PG.tpId
};

export const defLoginGameType = {
	returlGameUrl: 1,
	returnHtml: 2
};

const playTechLaunchGame = (client, game, mode, openType) => {
	try {
		iapiConf.clientUrl_ngm_desktop =
			"https://cachedownload-am.htsp123.com/ngmdesktop/casinoclient.html";
		iapiConf.clientUrl_ngm_mobile =
			"https://games-am.htsp123.com/casinomobile/casinoclient.html";
		iapiConf.clientUrl_live_desk =
			"https://cachedownload-am.htsp123.com/live/html5/desktop/";
		iapiConf.clientUrl_live_mob =
			"https://cachedownload-am.htsp123.com/live/html5/mobile/";
	} catch (error) {}

	iapiLaunchClient(client, game, mode, openType);
};

const launchGame = ({ client, mode, game, lang }) => {
	const real = mode === "real" ? 1 : 0;
	// Optional Variables
	const lobbyUrl = "";
	const logoutUrl = "";
	const supportUrl = "";
	const depositUrl = "";

	// Slots,Table Games and other non-live games
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(
			client,
			`language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}&backurl=${lobbyUrl}`
		);

		playTechLaunchGame(client, game, mode, "_blank");
	}

	// Live Games
	if (client === "live_desk" || client === "live_mob") {
		iapiSetClientParams(
			client,
			`&launch_alias=${game}&language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}`
		);
		playTechLaunchGame(client, null, mode, "_blank");
	}
};

const launchGameWithFunMode = ({ client, game, lang, mode }) => {
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(client, `language=${lang}&real=0`);
		playTechLaunchGame(client, game, mode, "_blank");
	}
};

export const useGotoGame = ({
	isLogin,
	langId,
	tpId,
	gameId,
	isFun = false,
	autoGetData = true,
	tpGameType: _tpGameType = null,
	allowBeforeLogin = false
}) => {
	const { errorPopBox } = usePopBox();
	const [data, setData] = useState({ account: "", password: "" });
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;

		if (
			!(isLogin === false && allowBeforeLogin) &&
			autoGetData &&
			isLogin
		) {
			handleGoToGame({
				isLogin,
				langId,
				tpId,
				gameId,
				isFun,
				tpGameType: _tpGameType
			});
		}

		return () => {
			isMountedRef.current = false;
		};
	}, [autoGetData, isLogin, langId, _tpGameType]);

	const handleGoToGame = useCallback(
		async ({
			isLogin: _isLogin = true,
			langId: _langId,
			tpId: _tpId,
			gameId: _gameId,
			isFun: _isFun,
			tpGameType,
			loginGameType
		}) => {
			let returnData = "";
			if (_isLogin) {
				try {
					const res = await api_tp_GotoGame({
						TpId: _tpId,
						LangId: _langId,
						gameId: _gameId,
						fun: _isFun ? "1" : "0",
						gameType:
							_tpId === defSpecialSetting.playTech ? "slots" : "",
						tpGameType: String(tpGameType),
						loginGameType: loginGameType
							? String(loginGameType)
							: ""
					});

					if (res.data.errorCode === 0 && res.data.message) {
						const result = res.data.message;
						setData(() => result);
						if (_tpId === defSpecialSetting.playTech) {
							const {
								account: username,
								password,
								lang,
								mode
							} = result;

							await iapiSetCallout("Login", response => {
								if (response.errorCode) {
									if (
										response.errorCode === 48 ||
										response.errorCode === "48"
									) {
										errorPopBox(
											`Login failed, error: ${response.errorCode} ,playerMessage: ${response.actions.PlayerActionShowMessage[0].message}`,
											response.errorCode
										);
									} else {
										errorPopBox(
											`Login failed, error: ${response.errorCode} ,playerMessage: ${response.playerMessage}`,
											response.errorCode
										);
									}
								} else {
									launchGame({ ...result });
								}
							});

							if (mode === "real") {
								iapiSetClientType("casino");
								iapiSetClientPlatform("web");
								iapiLogin(username, password, 1, lang);
							} else {
								launchGameWithFunMode({ ...result });
							}
						} else if (_tpId === defSpecialSetting.sports_9w) {
							returnData = JSON.parse(result);
						} else if (
							loginGameType === defLoginGameType.returnHtml
						) {
							const newWindow = window.open();
							newWindow.document.write(res.data.message);
						} else {
							window.open(res.data.message);
						}
					} else if (
						res.data.errorCode === 3000 &&
						res.data.message
					) {
						window.open(
							res.data.message,
							"Under Maintenance",
							"toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0"
						);
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				} catch (error) {}
			} else {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Login
				});
			}

			return returnData;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[gameId, isFun, isLogin, langId, tpId]
	);

	return { data, handleGoToGame };
};
