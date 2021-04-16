import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import skypeIconImg from "../../styles/img/sk_1.png";

import telegramIconImg from "../../styles/img/te_1.png";
import telegramQRcodeImg from "../../styles/img/te_qr.jpg";

import zaloIconImg from "../../styles/img/zalo_1.png";
import zaloQRcodeImg from "../../styles/img/zalo_qr.jpg";

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
					className="icon icon-circle-right"
					onClick={activeToggleHandler}>
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>
					<li>
						<a
							href="skype:live:.cid.ae9eac1a78556dc6?chat"
							target="_blank"
							rel="noreferrer">
							<img src={skypeIconImg} alt="skypeImg" />
							{t("lbl_Skype")}
						</a>
					</li>
					<li>
						<a href="https://t.me/Goal123csd" arget="_blank">
							<img src={telegramIconImg} alt="telegramImg" />
							{t("lbl_Telegram")}
						</a>
						<img src={telegramQRcodeImg} alt="telegramImg" />
					</li>
					<li>
						<a
							href="https://zalo.me/Goal123csd"
							target="_blank"
							rel="noreferrer">
							<img src={zaloIconImg} alt="zalo-icon" />
							{t("lbl_Zalo")}
						</a>
						<img src={zaloQRcodeImg} alt="zalo-qrcode" />
					</li>
				</ul>
			</div>
		</div>
	);
};
