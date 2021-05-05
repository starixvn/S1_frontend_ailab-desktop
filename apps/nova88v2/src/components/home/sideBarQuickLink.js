import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteInfo } from "../../config";

export default () => {
	const { t } = useTranslation();
	const [isIconListOpen, setIsIconListOpen] = useState(false);
	const [activeIcon, setActiveIcon] = useState(null);

	const switchIconActive = _mouseOverIcon => {
		setActiveIcon(_mouseOverIcon);
	};

	const removeIconActive = () => {
		setActiveIcon(null);
	};

	const toggleIconMenu = _nowShow => {
		setIsIconListOpen(false);
		if (_nowShow === "contactUs") {
			setIsIconListOpen(true);
		}
	};

	const defIconList = [
		{ id: 1, iconClass: "icon icon-chat" },
		{ id: 2, iconClass: "icon icon-instagram" },
		// { id: 3, iconClass: "icon icon-facebook2" },
		// { id: 4, iconClass: "icon icon-twitter" },
		{
			id: 5,

			iconClass: "icon icon-whatsapp",
			imgInfo: "+63 945 638 8147",
			imgSrc:
				"https://www.nova88.net/static/whatsappQR-94d78581cf79618d3510ad46f3a1c520.jpg"
		},
		{
			id: 6,

			iconClass: "icon icon-line",
			imgInfo: "@Nova88thai",
			imgSrc:
				"https://www.nova88.net/static/lineQR-bf41d1997d45a32bcf433f500f0dcfe7.jpg"
		}
	];

	const getIconAction = _iconId => {
		if (_iconId === 1) {
			window.LiveChatWidget.call("maximize");
		}
		if (_iconId === 2) {
			window.open(SiteInfo.socialMedia.ig.link);
		}
		if (_iconId === 3) {
			window.open(SiteInfo.socialMedia.fb.link);
		}
		if (_iconId === 4) {
			window.open(SiteInfo.socialMedia.twitter.link);
		}
		if (_iconId === 5) {
			window.open("https://wa.me/639456388147");
		}
		if (_iconId === 6) {
			window.open("https://lin.ee/SAPymLI");
		}
	};

	const iconList = defIconList.map(_icon => {
		return (
			<a
				key={`sidebar-link-${_icon.id}`}
				onClick={getIconAction.bind(this, _icon.id)}
				target="_blank"
				rel="noreferrer"
				className={`icon ${_icon.iconClass}${
					activeIcon === _icon.id ? " active" : ""
				}`}
				onMouseOver={switchIconActive.bind(this, _icon.id)}
				onFocus={() => 0}
				onMouseOut={removeIconActive.bind(this)}
				onBlur={() => 0}>
				{_icon.imgSrc ? (
					<div>
						{_icon.imgInfo}
						<img src={_icon.imgSrc} />
					</div>
				) : null}
			</a>
		);
	});

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
				{iconList}
			</div>
		</>
	);
};
