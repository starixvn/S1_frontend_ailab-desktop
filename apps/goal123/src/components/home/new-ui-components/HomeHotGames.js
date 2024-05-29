import { Link } from "gatsby";
import React, { useContext } from "react";
import { products } from "@ailab-desktop/common";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../../common/context";
import path from "../../../router";
import { bannerImgUrl } from "../../../config";
import useClickItem from "../hooks/useClickItem";

const HomeHotGames = () => {
	const { userInfo } = useContext(userInfoContext);
	const { onclickStaticProduct } = useClickItem();
	const { t } = useTranslation();

	return (
		<>
			<div className="home-title">{t("lbl_HotGame")}</div>
			<div className="home-hotgame">
				<div className="hotgame-wrapper">
					<div className="inner">
						{/* Click to trigger to SABA-SPORTS sports */}
						<button
							className="item brand big"
							onClick={() =>
								onclickStaticProduct(products.SabaSoccer)
							}
						>
							<span>{t("lbl_Sports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/sports-saba.png`}
								alt="home-sports-saba"
							/>
						</button>
						{/* Click to trigger to Vgaming */}
						<button
							className="item brand big"
							onClick={() =>
								onclickStaticProduct(products.Vgaming)
							}
						>
							<span>{t("lbl_Games")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/games-vgaming.png`}
								alt="home-games-vgaming"
							/>
						</button>
					</div>
					<div className="inner">
						{/* Click to trigger to BTI sports */}
						<button
							className="item brand"
							onClick={() =>
								onclickStaticProduct(products.BtiSport)
							}
						>
							<span>{t("lbl_Sports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/sports-bti.png`}
								alt="home-sports-bti"
							/>
						</button>
						{/* Click to trigger to V8poker */}
						<button
							className="item brand"
							onClick={() =>
								onclickStaticProduct(products.V8Poker)
							}
						>
							<span>{t("lbl_Games")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/games-v8power.png`}
								alt="home-games-v8power"
							/>
						</button>
						{/* Click to link to platform's Lobby-casino page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.liveCasino.root}`}
						>
							<span>{t("lbl_Casino")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/casino.png`}
								alt="home-casino"
							/>
						</Link>
						{/* Click to link to platform's slot page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.casino.root}`}
						>
							<span>{t("lbl_Slots")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/slots.png`}
								alt="home-slots"
							/>
						</Link>
					</div>
					<div className="inner">
						{/* Click to link to platform's Lobby-Lottery page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.lottery.root}`}
						>
							<span>{t("lbl_Lottery")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/lottery.png`}
								alt="home-lottery"
							/>
						</Link>
						{/* Click to link to platform's Lobby-fishing page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.fishing.root}`}
						>
							<span>{t("lbl_Fishing")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/fishing.png`}
								alt="home-fishing"
							/>
						</Link>
						{/* Click to link to platform's Lobby-esports page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.eSport.root}`}
						>
							<span>{t("lbl_eSports")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/esports.png`}
								alt="home-esports"
							/>
						</Link>
						{/* Click to link to platform's Lobby-cockfighting page */}
						<Link
							className="item"
							to={`/${userInfo.langId}/${path.cockFighting.root}`}
						>
							<span>{t("lbl_CockFighting")}</span>
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/hotgame/cockfighting.png`}
								alt="home-cockfighting"
							/>
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default HomeHotGames;
