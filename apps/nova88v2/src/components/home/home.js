import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { isDateRange } from "@ailab-desktop/common";
import { AngpaoFloatLink } from "@ailab-desktop/components";
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
import usePopBox from "../hook/usePopBox";
import { angpaoAllowedCurrencies, angPaoEventPeriod } from "../../pages/angpao";
import LiveCasino from "./liveCasino";
import { bannerImgUrl } from "../../config";

const IndexPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { allMaintainList } = useContext(maintainListContext);

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
		if (userInfo.isLogin && userInfo.userName) {
			const showDepositPopBox = () => {
				const cookieName = `balanceHint${userInfo.userName}`;
				let showDepositHint = false;
				if (readCookie(cookieName) !== "1") {
					setCookie(cookieName, "1", 1);
					showDepositHint = true;
				}

				if (showDepositHint) {
					api_account_GetWalletInfo().then(
						res => {
							if (
								res.data.errorCode === 0 &&
								isMountedRef.current
							) {
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
								errorPopBox(
									res.data.message || "error",
									res.data.errorCode
								);
							}
						},
						() => {
							if (isMountedRef.current) {
								errorPopBox();
							}
						}
					);
				}
			};

			const refeCookieName = `referral_${userInfo.userName}`;
			if (readCookie(refeCookieName) === "1") {
				showDepositPopBox();
			}
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			const closePopBox = () => {
				deleteCookie("popBoxMsg");
				setPopBox({ isOpen: false });
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={closePopBox}>
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
