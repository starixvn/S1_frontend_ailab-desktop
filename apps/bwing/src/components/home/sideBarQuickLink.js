import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import telegramImg from "../../styles/img/Telegram.png";
import zaloImg from "../../styles/img/zalo.png";

export default () => {
	const { t } = useTranslation();
	const [active, setActive] = useState(false);

	const activeToggleHandler = () => {
		setActive(prev => !prev);
	};

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	return (
		<div className={`quickLink${active ? " active" : ""}`}>
			<div>
				<button className="icon icon-chat" onClick={openLiveChat} />
				<i
					className="icon icon-contactIcon"
					onClick={activeToggleHandler}>
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>
					<li>
						<button onClick={openLiveChat}>
							<div className="icon icon-live-chat">
								{t("lbl_LiveChat")}
							</div>
						</button>
					</li>
					<li>
						<a
							className="icon icon-skype"
							href="skype:live:.cid.ae9eac1a78556dc6?chat"
							rel="noreferrer">
							{t("lbl_Skype")}
						</a>
					</li>
					<li>
						<div className="icon icon-Telegram">
							{t("lbl_Telegram")}
						</div>
						<img src={telegramImg} alt="telegramImg" />
					</li>
					<li>
						<div className="icon icon-zelo">{t("lbl_Zalo")}</div>
						<img src={zaloImg} alt="zaloImg" />
					</li>
				</ul>
			</div>
		</div>
	);
};
