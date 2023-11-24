import { navigate } from "gatsby";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import React, { useContext } from "react";
import {
	popBoxContext,
	userInfoContext,
	productTpIdsContext,
	maintainListContext,
	productTpGameTypeSettingListContext
} from "../common/context";
import { bannerImgUrl } from "../../config";
import { useGameMenu } from "../hook/useGameMenu";
import { defLoginGameType, useGotoGame } from "../hook/useGotoGame";
import defPopBoxType from "../common/defPopBoxType";
import { defTpGameType } from "../../datas/productList";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuType, defMenuLinks } from "../header/header.menu.def";
import { defEventIcon } from "../common/eventIcon";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const FourD = () => {
	const { t } = useTranslation();

	const {
		userInfo: { langId, isLogin, currencyId }
	} = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);

	const { sortGameMenu } = useGameMenu({ productTpIds });

	const { handleGoToGame } = useGotoGame({
		langId,
		isLogin,
		autoGetData: false
	});

	const {
		subMenu: defMenu,
		customSort,
		filterByAuth,
		checkBeforeLogin
	} = defMenuLinks["4d"];

	const subMenu = sortGameMenu({
		defMenu,
		customSort,
		filterByAuth,
		checkBeforeLogin
	});

	if (!allowedCurrencyList["4D"].includes(currencyId)) navigate(`/${langId}`);

	return (
		<>
			<div className="lobby-banner">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/lobby-4d/4dlobby_bn.png`}
								alt="banner"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="lobby-content">
				{subMenu
					.filter(({ tpId, tpGameType, allowCurrencies }) => {
						// filter site tpId
						const isInSiteTpList =
							!isLogin || productTpIds?.includes(tpId);

						// filter allow currency if exist
						const isAllowCurrency =
							!allowCurrencies ||
							allowCurrencies?.includes(currencyId);

						// filter tpGameTypeSettingList if exist and not showing when noShow is true
						const isShowLiveHost =
							tpGameTypeSettingList?.length === 0 ||
							!tpGameTypeSettingList?.find(
								({
									tpId: settingTpId,
									gameType: settingTpGameType
								}) =>
									settingTpId === tpId &&
									settingTpGameType === tpGameType
							)?.noShow;

						return (
							isInSiteTpList && isAllowCurrency && isShowLiveHost
						);
					})
					.map(
						({
							tpId,
							gameId,
							menuType,
							eventIcons,
							displayKey,
							tpGameType,
							displayText,
							lobbyPage: { bgImg }
						}) => {
							const underMaintain = allMaintainList.some(
								({
									tpId: maintainTpid,
									tpGameType: maintainTpGameType
								}) =>
									maintainTpid === tpId &&
									(maintainTpGameType === tpGameType ||
										maintainTpGameType ===
											defTpGameType.All)
							);

							const isLiveHostNoPlay =
								tpGameTypeSettingList?.find(
									({
										tpId: settingTpId,
										gameType: settingTpGameType
									}) =>
										settingTpId === tpId &&
										settingTpGameType === tpGameType
								)?.noPlay;

							const onClickGame = () => {
								const showLoginPopBox = () => {
									setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.Login
									});
								};

								if (underMaintain) return;

								if (!isLogin) {
									showLoginPopBox();
									return;
								}

								if (isLiveHostNoPlay) {
									setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.Success,
										icon: "icon icon-bell",
										description: (
											<div style={{ color: "red" }}>
												{t(
													"lbl_InaccessibleWithoutPermission"
												)}
											</div>
										),
										btnBar: (
											<div className="btnGroup">
												<button
													className="btn-check"
													onClick={() => {
														setPopBox({
															isOpen: false
														});
													}}
												>
													{t("lbl_Close")}
												</button>
											</div>
										)
									});
									return;
								}

								if (menuType === defMenuType.useGoToGame) {
									handleGoToGame({
										tpId,
										langId,
										gameId,
										tpGameType,
										isFun: false,
										loginGameType:
											defLoginGameType.returlGameUrl
									});
									return;
								}

								SET_ENTER_PAGE({
									tpId,
									langId,
									gameId,
									isLogin,
									currencyId,
									tpGameType,
									loginCallback: showLoginPopBox
								});
							};

							return (
								<div
									key={tpId}
									className={classNames(
										"lobby-content-item",
										{
											under: underMaintain
										}
									)}
									onClick={onClickGame}
								>
									{underMaintain && (
										<div className="under-text">
											{t("lbl_underMaintenance")}
										</div>
									)}
									<div className="img-wrapper">
										{eventIcons?.length > 0 &&
											eventIcons[0] ===
												defEventIcon.new && (
												<div className="new-icon">
													New
												</div>
											)}
										<img
											src={`${bannerImgUrl}/desktop/img/4.0/lobby-4d/${bgImg}`}
											alt={t(displayKey) ?? displayText}
										/>
										<div className="btn-container">
											<button>{t("lbl_PlayNow")}</button>
										</div>
									</div>
									<div className="lobby-title">
										{displayText}
									</div>
								</div>
							);
						}
					)}
			</div>
		</>
	);
};

export default FourD;
