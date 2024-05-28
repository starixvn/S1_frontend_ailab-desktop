import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl, siteInfo } from "../../config";
import path from "../../router";
import FooterPayment from "./FooterPayment";
import FooterProvider from "./FooterProvider";
import TandC from "../../service/t_and_c";

import useGetSocialChannel, {
	defDisplayPage
} from "../hook/useGetSocialChannel";

const HomeFooter = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Footer
	});

	const channelNameToImg = {
		Facebook: "icon-facebook",
		Zalo: "icon-zalo",
		Telegram: "icon-telegram",
		Skype: "icon-skype",
		Livechat: "icon-livechat"
	};

	return (
		<footer id="footer">
			<div className="footer-content">
				<div className="footer-top">
					{/* 。about  */}
					<div className="info">
						<a
							href={TandC(userInfo.langId).AboutUs}
							target="_blank"
							rel="noreferrer">
							{t("lbl_AboutUs")}
						</a>

						<a
							href={TandC(userInfo.langId).Terms}
							target="_blank"
							rel="noreferrer">
							{t("lbl_Terms")}
						</a>

						<a
							href={TandC(userInfo.langId).ResposibleGaming}
							target="_blank"
							rel="noreferrer">
							{t("lbl_ResposibleGaming")}
						</a>

						<a
							href={
								siteInfo({ langId: userInfo.langId })
									.affiliateLink
							}
							target="_blank"
							rel="noreferrer">
							{t("lbl_Affiliates")}
						</a>
					</div>

					{/* 需可觸發相對應的socialmedia */}
					<div className="social-media">
						<div className="social-media-item">
							<div className="title">
								{t("lbl_Home_Follow_Us")}
							</div>
							<div className="media">
								{/* facebook 5/22/24 這邊保留寫死 pm說另外一個區塊會把prd的關閉 */}
								<a
									href="https://www.facebook.com/goal123.official"
									target="_blank"
									rel="noreferrer">
									<img
										src={`${bannerImgUrl}/desktop/img/home-page/icon/icon-facebook.svg`}
										alt=""
									/>
								</a>
								{/* youtube 連結尚未給 */}
								<a href="https://www.youtube.com/@GOAL123VietNam">
									<img
										src={`${bannerImgUrl}/desktop/img/home-page/icon/icon-youtube.svg`}
										alt=""
									/>
								</a>
							</div>
						</div>
						<div className="social-media-item">
							<div className="title">{t("lbl_ContactUs")}</div>
							<div className="media">
								{socialChannel?.map(item => (
									<a
										key={`channel-${item.channelName}`}
										href={item.link}
										target="_blank"
										rel="noreferrer">
										<img
											src={`${bannerImgUrl}/desktop/img/home-page/icon/${
												channelNameToImg[
													item.channelName
												]
											}.svg`}
											alt={item.channelName}
										/>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				{/* 需連到相對應的Lobby頁, sports應連到saba-sports */}
				<div className="footer-bottom">
					<div className="game-collection">
						<div className="title">
							{t("lbl_Home_Game_Collection")}
						</div>
						<a href={`/${userInfo.langId}/${path.sports.root}`}>
							{t("lbl_Sports")}
						</a>
						<a href={`/${userInfo.langId}/${path.games.root}`}>
							{t("lbl_Games")}
						</a>
						<a href={`/${userInfo.langId}/${path.fishing.root}`}>
							{t("lbl_Fishing")}
						</a>
						<a href={`/${userInfo.langId}/${path.lottery.root}`}>
							{t("lbl_Lottery")}
						</a>
						<a href={`/${userInfo.langId}/${path.casino.root}`}>
							{t("lbl_Slots")}
						</a>
						<a href={`/${userInfo.langId}/${path.liveCasino.root}`}>
							{t("lbl_LiveCasino")}
						</a>
						<a
							href={`/${userInfo.langId}/${path.cockFighting.root}`}>
							{t("lbl_CockFighting")}
						</a>
					</div>
					<FooterPayment />
					<FooterProvider />
				</div>
				<div className="powered">
					<div className="brand-item">
						<span>{t("lbl_PoweredBy")}</span>
						<img
							src={`${bannerImgUrl}/desktop/img/bong88.png`}
							alt=""
						/>
					</div>
				</div>
				<div className="copyright">
					{`© Copyright ${new Date().getFullYear()}. Goal123. All Rights Reserved.`}
					<span>18+</span>
				</div>
			</div>
		</footer>
	);
};

export default HomeFooter;
