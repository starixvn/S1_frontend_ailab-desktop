import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
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
	isDateRange,
	number_format
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import config from "../../config";
import { defTpCategoryId } from "../../datas/productList";
import specialImg1 from "../../styles/img/slots777.png";
import specialImg2 from "../../styles/img/service.png";
import specialImg3 from "../../styles/img/bank.png";
import specialImg4 from "../../styles/img/speed.png";
import bong88Img from "../../styles/img/bong88.png";

import { BannerSwipper } from "../common/customSwipper";
import EventSwipper from "./components/eventSwipper";
import Marquee from "./components/marquee";
import LiveCasinoSwipper from "./components/liveCasinoSwipper";
import Jackpot from "./components/jackpot";
import HotGameList from "./components/hotGameList";
import News from "./components/news";
import PlatformSection from "./components/platform";
import WinnerBoard from "./winnerBoard";
import AngpowLink from "./angpowLink";
import MysteryBoxLink from "./mysteryBoxLink";
import SideBarQuickLink from "./sideBarQuickLink";
import QuickdownloadLink from "./quickdownloadLink";

const HomeV2 = ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { setIsRoot } = useContext(isRootContext);
	const [winnerList, setWinnerList] = useState([]);
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
		getTopWinnners();
	}, []);

	useEffect(() => {
		const ShowRankingPopup = () => {
			if (
				userInfo.isLogin === false &&
				isDateRange(null, "2021/05/18 23:59:59")
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.RankingWinner
				});
			}
		};

		const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
		const isShowOfficialAnnouncePopBox =
			readCookie(cookieOfficialAnnounce) !== "1";

		if (userInfo.isLogin === false && isShowOfficialAnnouncePopBox) {
			const clickCloseOfficialAnnounce = () => {
				setPopBox({ isOpen: false });
				ShowRankingPopup();
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.OfficialAnnounce,
				onClickClose: () => clickCloseOfficialAnnounce()
			});
			setCookie(cookieOfficialAnnounce, "1", 1);
		}

		if (!isShowOfficialAnnouncePopBox) {
			ShowRankingPopup();
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

			showDepositPopBox();
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	const clickItem = ({ tpId, gameId }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback,
			openInBlank: true
		});
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
		<main>
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
					maintainList={allMaintainList}
					defTpCategoryId={defTpCategoryId}
				/>

				<div className="indexInfo">
					<InfoCenter t={t} langId={userInfo.langId} />

					<News t={t} langId={userInfo.langId} />
				</div>

				<div className="information">
					<div>
						<div>
							<img src={specialImg1} alt="specialImg1" />
							<ul>
								<li className="title">
									{t("lbl_ExtensiveGames")}
								</li>
								<li>{t("lbl_ExtensiveGamesDesc")}</li>
							</ul>
						</div>

						<div>
							<img src={specialImg2} alt="specialImg2" />
							<ul>
								<li className="title">
									{t("lbl_ExcellentCustomerCare")}
								</li>
								<li>{t("lbl_ExcellentCustomerCareDesc")}</li>
							</ul>
						</div>

						<div>
							<img src={specialImg3} alt="specialImg3" />
							<ul>
								<li className="title">
									{t("lbl_PaymentMethods")}
								</li>
								<li>{t("lbl_PaymentMethodsDesc")}</li>
							</ul>
						</div>

						<div>
							<img src={specialImg4} alt="specialImg4" />
							<ul>
								<li className="title">
									{t("lbl_TransactionSpeed")}
								</li>
								<li>{t("lbl_TransactionSpeedDesc")}</li>
							</ul>
						</div>
					</div>
				</div>

				<PlatformSection
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
				/>

				<div className="powered">
					<div>{t("lbl_PoweredBy")}</div>
					<img src={bong88Img} alt="bong88Img" />
				</div>
			</section>

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

HomeV2.defaultProps = {
	productTpIds: []
};

HomeV2.propTypes = {
	productTpIds: PropTypes.arrayOf(PropTypes.number)
};

export default HomeV2;

const InfoCenter = ({ t, langId }) => (
	<div className="infoCenter">
		<div>
			<div className="title">
				<i className="icon icon-infocenter" />
				{t("lbl_InfoCenter")}
			</div>
			<div className="infoGroup">
				<a
					href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/Static/${langId}/HowToDeposit.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-deposit2" />
					{t("lbl_HowToDepoist")}
				</a>
				<a
					href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/Static/${langId}/HowToWithdrawal.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-withdrawal2" />
					{t("lbl_HowToWithdraw")}
				</a>
				<a
					href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/Static/${langId}/FAQ.html`}
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
