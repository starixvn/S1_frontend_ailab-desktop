import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

export default () => {
	const { t } = useTranslation();

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	return (
		<div className="quickLink">
			<div>
				<button className="icon icon-chat" onClick={openLiveChat} />
				<i className="icon icon-contactIcon">
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>
					{/* <li>
						<button onClick={openLiveChat}>
							<div className="icon icon-live-chat">
								{t("lbl_LiveChat")}
							</div>
						</button>
					</li> */}
					<li>
						<div className="icon icon-zalo">{t("lbl_Zalo")}</div>
						<img
							src={`${bannerImgUrl}/desktop/img/zalo.png`}
							alt="zaloImg"
						/>
					</li>
					<li>
						<div className="icon icon-Telegram">
							{t("lbl_Telegram")}
						</div>
						<img
							src={`${bannerImgUrl}/desktop/img/telegram.png`}
							alt="telegramImg"
						/>
					</li>
					<li>
						<a
							className="icon icon-skype"
							href="skype:live:.cid.ae9eac1a78556dc6?chat"
							rel="noreferrer">
							{t("lbl_Skype")}
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
