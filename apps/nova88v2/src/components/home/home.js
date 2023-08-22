import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import { AngpaoFloatLink } from "@ailab-desktop/components";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import {
	userInfoContext,
	popBoxContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import {
	readCookie,
	setCookie,
	deleteCookie,
	getUrlParameter,
	defCurrencyList
} from "../common/common";
import defPopBoxType from "../common/defPopBoxType";

import { api_account_GetWalletInfo } from "../../service/api/account";
import { defBannerType } from "../../service/api/site";
import SwipperBanner from "../common/swipperBanner";
import Marquee from "./marquee";
import path from "../../router";
import SideBarQuickLink from "./sideBarQuickLink";
import PromoList from "./promoList";
import HomeJackpot from "./jackpot";
import HotGameList from "./hotGameList";
import MysteryBoxLink from "./mysteryBoxLink";
import EventSwipper from "./eventSwipper";
import IndexCenterBanner from "./indexCenterBanner";
import { HomeNews } from "./homeNews";
import LatestVideo from "./latestVideo";
import QuickdownloadLink from "./quickdownloadLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angpaoAllowedCurrencies, angPaoEventPeriod } from "../../pages/angpao";
import LiveCasino from "./liveCasino";
import { bannerImgUrl } from "../../config";
import RecentlyViewedGameList from "./recentlyViewedGameList";
import { defDeviceType } from "../../service/api/base";
import usePopBox from "../hook/usePopBox";

const IndexPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);
	const { closePopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { allMaintainList } = useContext(maintainListContext);

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	});

	useEffect(() => {
		if (!userInfo.isLogin) {
			if (getUrlParameter("AffId")) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Join
				});
			}
		}
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		const displayDepositPopup = () => {
			const cookieName = `balanceHint${userInfo.userName}`;
			if (
				userInfo.isLogin &&
				userInfo.userName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				api_account_GetWalletInfo().then(
					res => {
						if (res.data.errorCode === 0 && isMountedRef.current) {
							const tpWallets = res.data.data.tpWallets?.map(
								tp => ({
									tpId: tp.tpId,
									balance: tp.balance
								})
							);

							const hasBalance =
								res.data.data?.balance ||
								tpWallets?.filter(tp => tp.balance > 0)
									.length >= 1;

							if (!hasBalance && showDepositHint) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						} else if (res.data.errorCode !== 0) {
							openNextPopUp();
						}
					},
					() => {
						if (isMountedRef.current) {
							openNextPopUp();
						}
					}
				);
			}
		};

		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;

			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				// * 多判斷是否有 accountName 防止 setCookie 紀錄 Guest 狀態時的資料
				!userInfo.accountName ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			// * 如果 bonusCode 不為 null ，打開並記錄 cookie，效期為一日
			getPopUpPromotion({
				deviceType: defDeviceType.Desktop,
				langId: userInfo.langId
			}).then(({ data: { data: { bonusCode } = {} } = {} }) => {
				if (bonusCode) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Modal,
						content: (
							<div className="pop promosbackpopup">
								<div className="promosback active">
									<div className="promosback-pop">
										<img
											src={`${
												process.env.REACT_APP_BANNER_URL
											}/desktop/img/promosBackPopup/promosPopup-${
												userInfo?.langId || "en"
											}.png`}
											alt="img-promosPopup"
										/>

										<button
											className="popgo"
											onClick={() => {
												navigate(
													`/${path.promotion.root}?bonusCode=${bonusCode}`
												);
											}}
										>
											{t("lbl_ClaimNow")}
										</button>

										<img
											src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
											alt="img-delet"
											className="closepop"
											onClick={() => {
												closePopBox();
												openNextPopUp();
											}}
										/>
									</div>
								</div>
							</div>
						)
					});
					setCookie(cookieName, "1", 1);
				} else {
					openNextPopUp();
				}
			});
		};

		const popUpStack = [displayDepositPopup, displayPromotionPopup];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};
		!userInfo.isResetPwd && openNextPopUp();
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								setPopBox({ isOpen: false });
							}}
						>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	return (
		<main>
			<SwipperBanner ImgFolder={[defBannerType.Promotions]} />
			<Marquee />
			<div className="projpot">
				<PromoList t={t} userInfo={userInfo} />
			</div>
			<div className="liveVideo">
				<LatestVideo />
				<div>
					<div className="moduleTitle">
						{t("lbl_UPCOMING_MATCHES")}
					</div>
					<EventSwipper
						langId={userInfo.langId}
						currencyId={userInfo.currencyId}
					/>
					{userInfo.currencyId === defCurrencyList.BDT ? (
						<div className="jpotModule">
							<div className="moduleTitle">{t("lbl_Slots")}</div>
							<Link
								className="slotsbox"
								to={`/${userInfo.langId}/${path.casino.root}`}
							>
								<img
									src={`${bannerImgUrl}/img/indexslots_bg_${userInfo.langId}.jpg`}
									alt="slot-bg"
								/>
								<img
									src={`${bannerImgUrl}/img/indexslots_items.png`}
									alt="slot-item"
								/>
							</Link>
						</div>
					) : (
						<HomeJackpot t={t} userInfo={userInfo} />
					)}
				</div>
			</div>
			<HotGameList
				t={t}
				userInfo={userInfo}
				maintainList={allMaintainList}
			/>
			{userInfo.isLogin && <RecentlyViewedGameList />}
			<div className="newsVideo">
				<HomeNews t={t} userInfo={userInfo} />

				<LiveCasino />
			</div>
			<IndexCenterBanner langId={userInfo.langId} />
			<SideBarQuickLink />
			<QuickdownloadLink t={t} />

			{/* 僅限過年期間不顯示 */}
			{!isDateRange(angPaoEventPeriod) && (
				<LuckyWheelLink
					langId={userInfo.langId}
					currencyId={userInfo.currencyId}
				/>
			)}

			{/* 僅限過年期間顯示且只支援部分語系 */}
			{isDateRange(angPaoEventPeriod) &&
				angpaoAllowedCurrencies.includes(userInfo?.currencyId) && (
					<AngpaoFloatLink />
				)}

			<MysteryBoxLink
				to={`/${userInfo.langId}/${path.mysteryBox.root}`}
			/>
		</main>
	);
};

export default IndexPage;
