import { useEffect, useState, useCallback, useRef } from "react";
import productList from "../../datas/productList";
import { api_tp_GotoGame } from "../../service/api/tp";
import usePopBox from "./usePopBox";

export const defSpecialSetting = {
	playTech: productList.casino_PT.tpId,
	sports_9w: productList._9WSports.tpId
};

const launchGame = ({ client, mode, game, lang }) => {
	const real = mode == "real" ? 1 : 0;
	// Optional Variables
	const lobbyUrl = "";
	const logoutUrl = "";
	const supportUrl = "";
	const depositUrl = "";

	// Slots,Table Games and other non-live games
	if (client == "ngm_desktop" || client == "ngm_mobile") {
		iapiSetClientParams(
			client,
			`language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}&backurl=${lobbyUrl}`
		);
		iapiLaunchClient(client, game, mode, "_blank");
	}

	// Live Games
	if (client == "live_desk" || client == "live_mob") {
		iapiSetClientParams(
			client,
			`&launch_alias=${game}&language=${lang}&real=${real}&lobby=${lobbyUrl}&logout=${logoutUrl}&deposit=${depositUrl}&support=${supportUrl}`
		);
		iapiLaunchClient(client, null, mode, "_blank");
	}
};

const launchGameWithFunMode = ({ client, game, lang, mode }) => {
	if (client === "ngm_desktop" || client === "ngm_mobile") {
		iapiSetClientParams(client, `language=${lang}&real=0`);
		iapiLaunchClient(client, game, mode, "_blank");
	}
};

export const useGotoGame = ({
	isLogin,
	langId,
	tpId,
	gameId,
	isFun = false,
	autoGetData = true
}) => {
	const { errorPopBox } = usePopBox();
	const [data, setData] = useState({ account: "", password: "" });

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		if (autoGetData) {
			handleGoToGame({ isLogin, langId, tpId, gameId, isFun });
		}

		return () => {
			isMountedRef.current = false;
		};
	});

	const handleGoToGame = useCallback(
		async ({
			isLogin: _isLogin = true,
			langId: _langId,
			tpId: _tpId,
			gameId: _gameId,
			isFun: _isFun
		}) => {
			let returnData = "???";
			if (_isLogin) {
				try {
					const res = await api_tp_GotoGame({
						TpId: _tpId,
						LangId: _langId,
						gameId: _gameId,
						fun: _isFun ? "1" : "0"
					});

					if (isMountedRef.current) {
						if (res.data.errorCode === 0 && res.data.message) {
							const result = JSON.parse(res.data.message);

							if (_tpId === defSpecialSetting.playTech) {
								const {
									account: username,
									password,
									lang,
									mode
								} = result;

								await iapiSetCallout("Login", response => {
									if (response.errorCode) {
										if (response.errorCode == 48) {
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
								returnData = result;
							} else {
								setData(() => result);
							}
						} else {
							errorPopBox(
								`[${res.data.errorCode}] ${res.data.message}`,
								res.data.errorCode
							);
						}
					}
				} catch (error) {}
			}

			return returnData;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[gameId, isFun, isLogin, langId, tpId]
	);

	return { data, handleGoToGame };
};
