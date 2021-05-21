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

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	return (
		<div
			onFocus={() => 0}
			onMouseOver={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			className={`quickLink${active ? " active" : ""}`}>
			<div onClick={() => setActive(false)}>
				<button className="icon icon-chat" onClick={openLiveChat} />

				<i
					className={
						active
							? "icon icon-cancel-circle"
							: "icon icon-circle-right"
					}>
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>
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
					<li>
						<a
							href="https://t.me/Goal123csd"
							target="_blank"
							rel="noreferrer">
							<img src={telegramIconImg} alt="telegramImg" />
							{t("lbl_Telegram")}
						</a>
						<img src={telegramQRcodeImg} alt="telegramImg" />
					</li>
					<li>
						<a
							href="skype:live:.cid.d357533c71e50fb5?chat"
							target="_blank"
							rel="noreferrer">
							<img src={skypeIconImg} alt="skypeImg" />
							{t("lbl_Skype")}
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
