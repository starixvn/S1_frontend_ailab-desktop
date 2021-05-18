import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import {
	userInfoContext,
	popBoxContext,
	isRootContext
} from "../common/context";
import {
	readCookie,
	setCookie,
	getUrlParameter,
	isDateRange
} from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defBannerType } from "../../service/api/site";
import SwipperBanner from "../common/swipperBanner";
import indexCenterBanner from "../../styles/img/indexCenterBanner.jpg";
import Marquee from "./marquee";
import path from "../../router";
import SideBarQuickLink from "./sideBarQuickLink";
import PromoList from "./promoList";
import HotGameList from "./hotGameList";
import AngpowLink from "./angpowLink";
import MysteryBoxLink from "./mysteryBoxLink";
import EventSwipper from "./eventSwipper";
import { HomeNews } from "./homeNews";
import Streaming from "./streaming";
import LatestVideo from "./latestVideo";
import LiveScore from "./liveScore";
import { _ACTION_TYPE } from "../../service/enterPage";

const IndexPage = ({ location }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);

	const isMountedRef = useRef(null);
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
		const cookiePerDay = `perDay_cookie`;
		const isShowPerDayPopBox = readCookie(cookiePerDay) !== "1";
		const clickPerDay = () => {
			setPopBox({ isOpen: false });
			setCookie(cookiePerDay, "1", 1);
			if (!userInfo.isLogin && isDateRange(null, "2021/05/18 23:59:59")) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.RankingWinner,
					onClickClose: () => setPopBox({ isOpen: false })
				});
			}
		};
		if (!userInfo.isLogin && isShowPerDayPopBox) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.PerDay,
				onClickClose: () => clickPerDay()
			});
		}
		if (
			!userInfo.isLogin &&
			isDateRange(null, "2021/05/18 23:59:59") &&
			!isShowPerDayPopBox
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.RankingWinner,
				onClickClose: () => setPopBox({ isOpen: false })
			});
		}
	}, [userInfo.isLogin, setPopBox, userInfo.langId]);

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
					api_account_GetWalletInfo().then(res => {
						if (res.data.errorCode === 0 && isMountedRef.current) {
							const tpWallets = res.data.data.tpWallets?.map(
								tp => {
									return {
										tpId: tp.tpId,
										balance: tp.balance
									};
								}
							);

							const hasBalance =
								res.data.data?.balance ||
								tpWallets?.filter(tp => {
									return tp.balance > 0;
								}).length >= 1;

							if (!hasBalance && showDepositHint) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						}
					});
				}
			};

			const showsJoinSuccess = () => {
				const closeJoinSuccess = () => {
					setPopBox({ isOpen: false });
				};
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.RegisterSuccess,
					closeBtn: (
						<button
							className="icon icon-close"
							onClick={closeJoinSuccess}
						/>
					),
					btnBar: (
						<div className="btnGroup">
							<Link
								className="blue"
								to={`/${userInfo.langId}/${path.deposit.root}`}>
								{t("lbl_DepositNow")}
							</Link>
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.profile.root}`}>
								{t("lbl_UpdatePersonalDetail")}
							</Link>
						</div>
					)
				});
			};

			const refeCookieName = `referral_${userInfo.userName}`;
			const isJoinCurrently = location.state?.isJoin;
			const clearLocationJoinState = () => {
				navigate(`/${userInfo.langId}`, { state: null });
			};

			if (isJoinCurrently) {
				showsJoinSuccess();
				clearLocationJoinState();
			} else if (readCookie(refeCookieName) === "1") {
				showDepositPopBox();
			}
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	return (
		<main>
			<SwipperBanner ImgFolder={[defBannerType.Promotions]} />
			<Marquee />
			<PromoList t={t} userInfo={userInfo} />
			<div className="liveVideo">
				<LatestVideo />
				<div>
					<div className="moduleTitle icon icon-upcomingmatches">
						{t("lbl_UPCOMING_MATCHES")}
					</div>
					<EventSwipper langId={userInfo.langId} />
					<LiveScore langId={userInfo.langId} />
				</div>
			</div>
			<HotGameList t={t} userInfo={userInfo} />
			<div className="newsVideo">
				<HomeNews t={t} userInfo={userInfo} />
				<Streaming />
			</div>
			<img
				className="indexCenterBanner"
				src={indexCenterBanner}
				alt="IndexCenterBanner"
			/>
			<SideBarQuickLink />
			<AngpowLink
				to={`/${userInfo.langId}/${path.angpow.root}`}
				langId={userInfo.langId}
			/>
			<MysteryBoxLink
				to={`/${userInfo.langId}/${path.mysteryBox.root}`}
			/>
		</main>
	);
};

export default IndexPage;
