import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import { userInfoContext } from "../common/context";
import { bannerImgUrl, siteInfo } from "../../config";
import path from "../../router";
import Payment from "./Payment";
import FooterProvider from "./Provider";
import TandC from "../../service/t_and_c";

import useGetSocialChannel, {
	defDisplayPage,
	defChannelName,
	defLinkType,
	sideBarImgName
} from "../hook/useGetSocialChannel";

const HomeFooter = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Home
	});

	const livechatData = socialChannel?.find(
		channel => channel.channelName === defChannelName.LiveChat
	);

	const zaloData = socialChannel?.find(
		channel => channel.channelName === defChannelName.Zalo
	);

	const openLiveChat = () => {
		if (livechatData) {
			window.LiveChatWidget.call("maximize");
		}
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
							style={{ fontWeight: "bold" }}
							href={siteInfo(userInfo.langId).affiliateLink}
							target="_blank"
							rel="noreferrer">
							{t("lbl_Affiliates")?.toUpperCase()}
						</a>
					</div>

					{/* 需可觸發相對應的socialmedia */}
					<div className="social-media">
						<div className="social-media-item">
							<div className="title">Follow us</div>
							<div className="media">
								{/* facebook */}
								<a
									href="https://www.facebook.com/dangcapnhacai.goal123/"
									target="_blank">
									<img
										src={`${bannerImgUrl}/desktop/img/home-page/icon/icon-facebook.svg`}
										alt=""
									/>
								</a>
								{/* youtube */}
								<a href="">
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
								{/* zalo */}
								<a
									href={zaloData ? zaloData.link : "#"}
									target="_blank">
									<img
										src={`${bannerImgUrl}/desktop/img/home-page/icon/icon-zalo.svg`}
										alt=""
									/>
								</a>
								{/* live chat */}
								<a onClick={openLiveChat}>
									<img
										src={`${bannerImgUrl}/desktop/img/home-page/icon/icon-livechat.svg`}
										alt=""
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
				{/* 需連到相對應的Lobby頁, sports應連到saba-sports */}
				<div className="footer-bottom">
					<div className="game-collection">
						<div className="title">Games Collection</div>
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
							{t("lbl_Casino")}
						</a>
						<a href={`/${userInfo.langId}/${path.liveCasino.root}`}>
							{t("lbl_LiveCasino")}
						</a>
						<a href={`/${userInfo.langId}/${path.casino.root}`}>
							Cockfighting
						</a>
					</div>
					<Payment />
					<FooterProvider />
				</div>
				<div className="powered">
					<div className="brand-item">
						<span>powered by</span>
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
