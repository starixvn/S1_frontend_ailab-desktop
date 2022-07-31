import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

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
							href="https://zalo.me/goal_csd"
							target="_blank"
							rel="noreferrer">
							<img
								src={`${bannerImgUrl}/desktop/img/zalo_1.png`}
								alt="zalo-icon"
							/>
							{t("lbl_Zalo")}
						</a>
						<img
							src={`${bannerImgUrl}/desktop/img/zalo_qr.jpg`}
							alt="zalo-qrcode"
						/>
					</li>
					<li>
						<a
							href="https://t.me/Goal123csd"
							target="_blank"
							rel="noreferrer">
							<img
								src={`${bannerImgUrl}/desktop/img/te_1.png`}
								alt="telegramImg"
							/>
							{t("lbl_Telegram")}
						</a>
						<img
							src={`${bannerImgUrl}/desktop/img/te_qr.jpg`}
							alt="telegramImg"
						/>
					</li>
					<li>
						<a
							href="skype:live:.cid.d357533c71e50fb5?chat"
							target="_blank"
							rel="noreferrer">
							<img
								src={`${bannerImgUrl}/desktop/img/sk_1.png`}
								alt="skypeImg"
							/>
							{t("lbl_Skype")}
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};
