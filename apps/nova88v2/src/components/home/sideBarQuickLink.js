import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { SiteInfo, bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { currencyCode } from "../../datas/countryCode";
import lineQR from "../../styles/img/lineQR.jpg";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [isIconListOpen, setIsIconListOpen] = useState(false);
	const [activeIcon, setActiveIcon] = useState(null);

	const allCurrencyCode = Object.values(currencyCode);

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

	const _currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	const defIconList = [
		{ id: 1, iconClass: "icon icon-chat" },
		{ id: 2, iconClass: "icon icon-instagram" },
		{ id: 3, iconClass: "icon icon-facebook2" },
		{ id: 4, iconClass: "icon icon-twitter" },
		{
			id: 5,
			displayByCurrency: [currencyCode.MY, currencyCode.ID],
			iconClass: "icon icon-whatsapp",
			imgInfo: "+63 927 316 5888",
			imgSrc: `${bannerImgUrl}/img/whatsapp.jpg`
		},
		{
			id: 6,
			displayByCurrency: [currencyCode.TH],
			iconClass: "icon icon-line",
			imgInfo: "@Nova88thai",
			imgSrc: lineQR
		},
		{
			id: 7,
			displayByCurrency: allCurrencyCode,
			iconClass: "icon icon-telegram",
			imgInfo: "@Nova88Support1"
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
			window.open("https://wa.me/639273165888");
		}
		if (_iconId === 6) {
			window.open("https://lin.ee/SAPymLI");
		}
		if (_iconId === 7) {
			window.open("https://t.me/Nova88Support1");
		}
	};

	const icons = defIconList.filter(_icon =>
		_icon.displayByCurrency?.includes(_currencyId)
	);

	const iconList = (icons.length === 0 ? defIconList : icons).map(_icon => {
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
