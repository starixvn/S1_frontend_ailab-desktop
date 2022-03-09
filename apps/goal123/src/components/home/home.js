import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import { defPopBoxType } from "../common/popBox";
import usePopBox from "../hook/usePopBox";
import { defBannerType } from "../../service/api/site";
import {
	setCookie,
	readCookie,
	deleteCookie,
	isDateRange,
	number_format
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import config from "../../config";
import { BannerSwipper } from "../common/customSwipper";
import EventSwipper from "./components/eventSwipper";
import Marquee from "./components/marquee";
import LiveCasinoSwipper from "./components/liveCasinoSwipper";
import Jackpot from "./components/jackpot";
import HotGameList from "./components/hotGameList";
import News from "./components/news";
import WinnerBoard from "./winnerBoard";
import AngpowLink from "./angpowLink";
import MysteryBoxLink from "./mysteryBoxLink";
import SideBarQuickLink from "./sideBarQuickLink";
import QuickdownloadLink from "./quickdownloadLink";
import { defTpGameType } from "../../datas/productList";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { defEventPeriod } from "../common/eventIcon";
import Fireworks from "../specialEffects/fireworks";
import { defEventPeriod as NewYearEventPeriod } from "../common/popbox.newYear";

const Home = ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { setIsRoot } = useContext(isRootContext);
	const [winnerList, setWinnerList] = useState([]);
	const { allMaintainList } = useContext(maintainListContext);
	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	});

	useEffect(() => {
		getTopWinnners();
	}, []);

	useEffect(() => {
		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
			const isShowOfficialAnnouncePopBox =
				readCookie(cookieOfficialAnnounce) !== "1";

			if (
				!isDateRange(
					NewYearEventPeriod.startDate,
					NewYearEventPeriod.endDate
				) &&
				userInfo.isLogin === false &&
				isShowOfficialAnnouncePopBox
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.OfficialAnnounce,
					onClickClose: openNextPopUp
				});
				setCookie(cookieOfficialAnnounce, "1", 1);
			} else {
				openNextPopUp();
			}
		};

		const displayNewYearPopup = () => {
			if (
				isDateRange(
					NewYearEventPeriod.startDate,
					NewYearEventPeriod.endDate
				) &&
				!readCookie(`NewYear-${window.location.hostname}`)
			) {
				setPopBox({
					isOpen: true,
					customLayout: true,
					popBoxType: defPopBoxType.NewYear,
					onClickClose: openNextPopUp,
					langId: userInfo.langId
				});
			} else {
				openNextPopUp();
			}
		};

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
						res.data.errorCode = 1;
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

							if (!hasBalance) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						} else if (res.data.errorCode !== 0) {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode,
								openNextPopUp
							);
						}
					},
					() => {
						if (isMountedRef.current) {
							errorPopBox(null, null, openNextPopUp);
						}
					}
				);
			} else {
				openNextPopUp();
			}
		};

		const popUpStack = [
			displayDepositPopup,
			displayNewYearPopup,
			displayAnnouncePopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};

		openNextPopUp();
	}, [userInfo.isLogin, setPopBox, userInfo.langId, userInfo.userName]);

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

	const clickItem = ({ tpId, gameId, tpGameType }) => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === tpId &&
				(mt.tpGameType === tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			const closePopBox = () => {
				setPopBox({ isOpen: false });
			};
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: closePopBox
			});
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				openInBlank: true,
				tpGameType
			});
		}
	};

	const getTopWinnners = () => {
		const payload = {
			lBCategoryId: 0,
			TopNum: 10,
			BeforeDays: 0,
			EventCode: "202104"
		};

		api_events_GetLeaderboardListV2(payload).then(
			res => {
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setWinnerList(res.data.data);
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return (
		<main id="main" className={isEvent ? "newyear" : ""}>
			{isEvent && <Fireworks />}
			<BannerSwipper
				ImgFolder={[defBannerType.Promotions]}
				withBtn={false}
				withPagination={true}
				config={{
					effect: "fade",
					autoplay: {
						delay: 5000,
						disableOnInteraction: false
					}
				}}
			/>

			<EventSwipper langId={userInfo.langId} />

			<Marquee />

			<section>
				<div className="indexliveCasinoList topten">
					<LiveCasinoSwipper
						t={t}
						clickItem={clickItem}
						langId={userInfo.langId}
						productTpIds={productTpIds}
					/>
					<Jackpot t={t} userInfo={userInfo} />
					<WinnerBoard
						t={t}
						number_format={number_format}
						winnerList={winnerList}
					/>
				</div>

				<HotGameList
					t={t}
					langId={userInfo.langId}
					clickItem={clickItem}
					navigate={navigate}
					allMaintainList={allMaintainList}
				/>

				<div className="indexInfo">
					<InfoCenter t={t} langId={userInfo.langId} />

					<News t={t} langId={userInfo.langId} />
				</div>

				{/* <PlatformSection
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
				/> */}
			</section>

			<LuckyWheelLink langId={userInfo.langId} />

			<AngpowLink
				to={`/${userInfo.langId}/${path.angpow.root}`}
				langId={userInfo.langId}
			/>

			<MysteryBoxLink
				to={`/${userInfo.langId}/${path.mysteryBox.root}`}
				langId={userInfo.langId}
			/>

			<SideBarQuickLink />

			<QuickdownloadLink />
		</main>
	);
};

Home.defaultProps = {
	productTpIds: []
};

Home.propTypes = {
	productTpIds: PropTypes.arrayOf(PropTypes.number)
};

export default Home;

const InfoCenter = ({ t, langId }) => (
	<div className="infoCenter">
		<div>
			<div className="title">
				<i className="icon icon-infocenter" />
				{t("lbl_InfoCenter")}
			</div>
			<div className="infoGroup">
				<a
					href={`${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/HowToDeposit.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-deposit2" />
					{t("lbl_HowToDepoist")}
				</a>
				<a
					href={`${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/HowToWithdrawal.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-withdrawal2" />
					{t("lbl_HowToWithdraw")}
				</a>
				<a
					href={`${config.t_and_cURL}/Static/${config.siteName}/Static/${langId}/FAQ.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-support" />
					{t("lbl_FAQ")}
				</a>
			</div>
		</div>
	</div>
);

InfoCenter.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};
