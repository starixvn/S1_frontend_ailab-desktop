import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SiteInfo } from "../../config";

export default () => {
	const { t } = useTranslation();
	const [isIconListOpen, setIsIconListOpen] = useState(false);
	const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
	const [isLineOpen, setIsLineOpen] = useState(false);

	const toggleIconMenu = _nowShow => {
		setIsIconListOpen(false);
		if (_nowShow === "contactUs") {
			setIsIconListOpen(true);
		}
	};

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	const toggleWhatsAppQR = () => {
		setIsWhatsAppOpen(!isWhatsAppOpen);
	};

	const toggleLineQR = () => {
		setIsLineOpen(!isLineOpen);
	};

	return (
		<>
			<div
				className={`quickLinkNew1${isIconListOpen ? " active" : ""}`}
				onMouseOver={toggleIconMenu.bind(this, "contactUs")}
				onFocus={() => 0}>
				<i className="icon icon-arrow-left2" />
				<div>{t("lbl_ContactUs")}</div>
			</div>
			<div
				className={`quickLinkNew2${isIconListOpen ? "" : " active"}`}
				onMouseLeave={toggleIconMenu.bind(this, "")}
				onBlur={() => 0}>
				<i className="icon icon-arrow-right2" />
				<a
					onClick={openLiveChat.bind(this)}
					className="icon icon-chat"
				/>
				<a
					href={SiteInfo.socialMedia.ig.link}
					target="_blank"
					rel="noreferrer"
					className="icon icon-instagram"
				/>
				<a
					href={SiteInfo.socialMedia.fb.link}
					target="_blank"
					rel="noreferrer"
					className="icon icon-facebook2"
				/>
				<a
					href={SiteInfo.socialMedia.twitter.link}
					target="_blank"
					rel="noreferrer"
					className="icon icon-twitter"
				/>
				<a
					href="https://wa.me/639456388147"
					target="_blank"
					rel="noreferrer"
					className={`icon icon-whatsapp${
						isWhatsAppOpen ? " active" : ""
					}`}
					onMouseOver={toggleWhatsAppQR.bind(this)}
					onFocus={() => 0}
					onMouseOut={toggleWhatsAppQR.bind(this)}
					onBlur={() => 0}>
					<div>
						+63 945 638 8147
						<img src="https://www.nova88.net/static/whatsappQR-94d78581cf79618d3510ad46f3a1c520.jpg" />
					</div>
				</a>
				<a
					href="https://lin.ee/SAPymLI"
					target="_blank"
					rel="noreferrer"
					className={`icon icon-line${isLineOpen ? " active" : ""}`}
					onMouseOver={toggleLineQR.bind(this)}
					onFocus={() => 0}
					onMouseOut={toggleLineQR.bind(this)}
					onBlur={() => 0}>
					<div>
						@Nova88thai
						<img src="https://www.nova88.net/static/lineQR-bf41d1997d45a32bcf433f500f0dcfe7.jpg" />
					</div>
				</a>
			</div>
		</>
	);
};
