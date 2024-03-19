import React, { useContext, useState } from "react";
import Swiper from "react-id-swiper";
import {
	useGetHotGameListQuery,
	useGetSlotGamePageQuery
} from "@ailab-desktop/service";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	SET_CASINO_ENTER_PAGE,
	SET_ENTER_PAGE
} from "../../../service/enterPage";
import paths from "../../../router";
import { useAuth } from "../../hook";
import { defMenuLinks } from "../../header/header.menu.def";
import usePopBox from "../../hook/usePopBox";
import defPopBoxType from "../../common/defPopBoxType";
import { defDeviceType } from "../../../service/api/base";
import { maintainListContext } from "../../common/context";
import {
	defCategory,
	defSlotTpGameType,
	defTpGameType
} from "../../../datas/productList";
import useDelayFunc from "../../hook/useDelayFunc";
import { defCurrencyList } from "../../common/common";
import {
	defLoginGameType,
	defSpecialSetting,
	useGotoGame
} from "../../hook/useGotoGame";

const getTpGameType = tpId =>
	Object.values(defSlotTpGameType).find(obj => obj.tpId === tpId) ?? {};

const HotGame = () => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();
	const { setPopBox, closePopBox } = usePopBox();
	const { allMaintainList: maintainList } = useContext(maintainListContext);

	const [showHotGameNavigation, setShowHotGameNavigation] = useState(false);
	const [showJackpotNavigation, setShowJackpotNavigation] = useState(false);

	const { checkBeforeLogin, subMenu: slotsMenu } = defMenuLinks.slot;
	const ppItem = slotsMenu.find(({ keyName }) => keyName === "slot_PP");
	const sgItem = slotsMenu.find(({ keyName }) => keyName === "slot_SG");
	const { throttle } = useDelayFunc();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const { data: hotGame = [] } = useGetHotGameListQuery(
		{
			deviceType: defDeviceType.Desktop,
			currencyId: userInfo.currencyId,
			langId: userInfo.langId
		},
		{
			selectFromResult: response => {
				const { data } = response;
				return { data: data?.data?.HotGame };
			}
		}
	);

	const { data: { jackpot = [], providerList } = {} } =
		useGetSlotGamePageQuery(
			{
				deviceType: defDeviceType.Desktop,
				currencyId: userInfo.currencyId,
				slotGameCategoryList: [2]
			},
			{
				selectFromResult: response => {
					const { data } = response;

					return { data: data?.data };
				}
			}
		);

	const handleOpenHotGame = ({ tpId, gameId, tpGameType, tpCategory }) => {
		// * 登入彈窗
		if (checkBeforeLogin && !userInfo?.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
			return;
		}

		// * 維護彈窗
		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === tpId &&
				(mt.tpGameType === tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);
		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: closePopBox
			});
			return;
		}

		if (tpCategory === defCategory.Slots) {
			// * 進入 slots 遊戲
			SET_CASINO_ENTER_PAGE({
				tpId,
				gameId,
				langId: userInfo.langId,
				tpGameType,
				execFunction:
					tpId === defSpecialSetting.PG
						? handleGoToGame.bind(this, {
								langId: userInfo.langId,
								tpId,
								gameId,
								isFun: false,
								tpGameType,
								loginGameType: defLoginGameType.returnHtml
						  })
						: null
			});
			return;
		}

		// * 進入 slots 遊戲
		SET_ENTER_PAGE({
			langId: userInfo.langId,
			tpId,
			gameId,
			isLogin: userInfo.isLogin,
			tpGameType
		});
	};

	const handleOpenSlotGame = ({
		tpId,
		gameId,
		isFree,
		delay,
		tpGameType
	}) => {
		// * 登入彈窗
		if (!isFree && !userInfo?.isLogin) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
			return;
		}

		// * 維護彈窗
		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === tpId &&
				(mt.tpGameType === tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: closePopBox
			});
			return;
		}

		// * 倒數五秒才能再次開啟遊戲
		throttle(
			() =>
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree,
					langId: userInfo.langId,
					tpGameType
				}),
			delay
		);
	};

	const hotGameSwiperConfig = {
		slidesPerView: 3,
		spaceBetween: 25,
		rebuildOnUpdate: false,
		// * 市場希望只透過按鈕觸發
		autoplay: false,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showHotGameNavigation ? 1 : 0.2 }}
				className="swiper-button-prev"
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showHotGameNavigation ? 1 : 0.2 }}
				className="swiper-button-next"
			/>
		)
	};

	const jackpotSwiperConfig = {
		slidesPerView: 7,
		spaceBetween: 25,
		rebuildOnUpdate: false,
		// * 市場希望只透過按鈕觸發
		autoplay: false,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		renderPrevButton: () => (
			<div
				style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
				className="swiper-button-prev"
			/>
		),
		renderNextButton: () => (
			<div
				style={{ opacity: showJackpotNavigation ? 1 : 0.2 }}
				className="swiper-button-next"
			/>
		)
	};

	// * 兩者都空值的話不顯示整個元件
	if (hotGame?.length === 0 && jackpot?.length === 0) return null;

	return (
		<div className="hotgame">
			{hotGame?.length > 0 && (
				<>
					<div className="maintitle">
						{t("lbl_HOT_GAMES")}
						<Link to={`/${userInfo.langId}/${paths.casino.root}`}>
							{t("lbl_More")}
						</Link>
					</div>
					<div className="hotgame-content">
						<div className="hotgame-content-item">
							{/* // * 幣別 INR 顯示 SG 遊戲，其餘顯示 PP */}
							{userInfo.currencyId === defCurrencyList.INR ? (
								<>
									<img
										className="left-bn"
										src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/hotgame-bn-spad.png`}
										alt=""
									/>
									<button
										className="all-btn"
										onClick={() => {
											const {
												tpId,
												tpGameType,
												gameId,
												tpCategory
											} = sgItem;
											handleOpenHotGame({
												tpId,
												gameId,
												tpGameType,
												tpCategory
											});
										}}
									>
										{t("lbl_PlayNow")}
									</button>
								</>
							) : (
								<>
									<img
										className="left-bn"
										src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/hotgame-bn-pp.png`}
										alt=""
									/>
									<button
										className="all-btn"
										onClick={() => {
											const {
												tpId,
												tpGameType,
												gameId,
												tpCategory
											} = ppItem;
											handleOpenHotGame({
												tpId,
												gameId,
												tpGameType,
												tpCategory
											});
										}}
									>
										{t("lbl_PlayNow")}
									</button>
								</>
							)}
						</div>
						<div className="hotgame-content-item">
							<img
								className="right-bn"
								src="https://banner.0814media.net/desktop/img/4.0/hotgame-bn-royal.png"
								alt=""
							/>

							<div
								className="hotgameswiper"
								onMouseOver={() =>
									setShowHotGameNavigation(true)
								}
								onMouseOut={() =>
									setShowHotGameNavigation(false)
								}
								onFocus={() => 0}
								onBlur={() => 0}
							>
								<Swiper {...hotGameSwiperConfig}>
									{hotGame.map(
										({
											gameLogo,
											gameName,
											tpId,
											gameId,
											tpGameType,
											tpCategory
										}) => (
											<div key={gameName}>
												<a
													onClick={() =>
														handleOpenHotGame({
															tpId,
															gameId,
															tpGameType,
															tpCategory
														})
													}
												>
													<div className="hotgame-item">
														<img
															src={gameLogo}
															alt="img-hot-game"
														/>
														<span>{gameName}</span>
													</div>
												</a>
											</div>
										)
									)}
								</Swiper>
							</div>
						</div>
					</div>
				</>
			)}

			{jackpot?.length > 0 && (
				<>
					<div className="maintitle">
						{t("lbl_Jackpot")}
						<Link to={`/${userInfo.langId}/${paths.casino.root}`}>
							{t("lbl_More")}
						</Link>
					</div>

					<div
						className="jackpotswiper"
						onMouseOver={() => setShowJackpotNavigation(true)}
						onMouseOut={() => setShowJackpotNavigation(false)}
						onFocus={() => 0}
						onBlur={() => 0}
					>
						<Swiper {...jackpotSwiperConfig}>
							{jackpot.map(
								({ tpId, gameId, imgName, gameName }) => {
									const brandTpName = providerList?.find(
										obj => obj.tpId === tpId
									)?.tpName;
									const imgUrl = `https://img.0814media.net/${brandTpName}/${
										imgName[userInfo.langId] || imgName.en
									}`;

									const name =
										gameName[userInfo.langId] ||
										gameName.en;

									return (
										<div key={imgName}>
											<a
												className="test"
												onClick={() => {
													handleOpenSlotGame({
														tpId,
														gameId,
														isFree: false, // * 不試玩
														delay: 5000,
														tpGameType:
															getTpGameType(tpId)
																.tpGameType
													});
												}}
											>
												<div className="jackpot-item">
													<img
														src={imgUrl}
														alt="img-hot-game"
													/>
													<span>{name}</span>
												</div>
											</a>
										</div>
									);
								}
							)}
						</Swiper>
					</div>
				</>
			)}
		</div>
	);
};

export default HotGame;
