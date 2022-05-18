/* eslint-disable react/no-array-index-key */
import React, { useState, useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { SiteInfo, bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";
import { getCurrencyCode, langAndCurrMapping } from "../common/common";
import { currencyCode } from "../../datas/countryCode";
import useGetSocialChannel, {
	defDisplayPage,
	defChannelName
} from "../hook/useGetSocialChannel";

const defElemType = {
	button: "button"
};

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [isIconListOpen, setIsIconListOpen] = useState(false);
	const [activeIcon, setActiveIcon] = useState(null);
	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		currencyId: userInfo.currencyId ?? langAndCurrMapping[userInfo.langId],
		displayPage: defDisplayPage.Home
	});

	const getChannelByName = channelName =>
		socialChannel?.find(el => el.channelName === channelName);

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
		{
			iconClass: "icon icon-chat",
			elemType: defElemType.button,
			onClick: () => window.LiveChatWidget.call("maximize")
		},
		{
			iconClass: "icon icon-instagram",
			onClick: () =>
				window.open(
					getChannelByName(defChannelName.Instagram)?.link ??
						SiteInfo.socialMedia.ig.link
				),
			link:
				getChannelByName(defChannelName.Instagram)?.link ??
				SiteInfo.socialMedia.ig.link
		},
		{
			iconClass: "icon icon-facebook2",
			link:
				getChannelByName(defChannelName.Facebook)?.link ??
				SiteInfo.socialMedia.fb.link
		},
		{
			iconClass: "icon icon-twitter",
			link:
				getChannelByName(defChannelName.Twitter)?.link ??
				SiteInfo.socialMedia.twitter.link
		},
		{
			displayByCurrency: [currencyCode.MY, currencyCode.ID],
			iconClass: "icon icon-whatsapp",
			imgInfo: getChannelByName(defChannelName.WhatsApp)?.title,
			qrCode: getChannelByName(defChannelName.WhatsApp)?.link,
			imgSrc: `${bannerImgUrl}/img/whatsapp.jpg`,
			link: getChannelByName(defChannelName.WhatsApp)?.link
		},
		{
			displayByCurrency: [currencyCode.TH],
			iconClass: "icon icon-line",
			imgInfo:
				getChannelByName(defChannelName.LINE)?.title ?? "@Nova88thai",
			qrCode: getChannelByName(defChannelName.LINE)?.link,
			imgSrc: `${bannerImgUrl}/desktop/img/lineQR.jpg`,
			link:
				getChannelByName(defChannelName.LINE)?.link ??
				"https://lin.ee/SAPymLI"
		},
		{
			displayByCurrency: allCurrencyCode,
			iconClass: "icon icon-telegram",
			imgInfo:
				getChannelByName(defChannelName.Telegram)?.title ??
				"@Nova88Support1",
			link:
				getChannelByName(defChannelName.Telegram)?.link ??
				"https://t.me/Nova88Support1"
		},
		{
			displayByCurrency: allCurrencyCode,
			iconClass: "icon icon-envelope",
			link:
				getChannelByName(defChannelName.Email)?.link ??
				"mailto:support@nova88.com"
		}
	];

	const icons = defIconList.filter(_icon =>
		_icon.displayByCurrency?.includes(_currencyId)
	);

	const iconList = (icons.length === 0 ? defIconList : icons).map(
		(_icon, idx) => {
			const img = (_icon.imgSrc || _icon.qrCode) && (
				<div>
					{_icon.imgInfo}
					{_icon.qrCode && (
						<QRCode
							value={_icon.qrCode}
							renderAs="svg"
							size={120}
							includeMargin={true}
						/>
					)}
					{_icon.imgSrc && !_icon.qrCode && (
						<img src={_icon.imgSrc} alt={`${_icon.iconClass}`} />
					)}
				</div>
			);

			if (_icon.elemType === defElemType.button) {
				return (
					<button
						key={`sidebar-link-${idx}`}
						onClick={() => _icon.onClick() ?? null}
						className={`icon ${_icon.iconClass}${
							activeIcon === idx ? " active" : ""
						}`}
						onMouseOver={switchIconActive.bind(this, idx)}
						onFocus={() => 0}
						onMouseOut={removeIconActive.bind(this)}
						onBlur={() => 0}>
						{img}
					</button>
				);
			}

			return (
				<a
					key={`sidebar-link-${idx}`}
					href={_icon.link}
					target="_blank"
					rel="noreferrer"
					className={`icon ${_icon.iconClass}${
						activeIcon === idx ? " active" : ""
					}`}
					onMouseOver={switchIconActive.bind(this, idx)}
					onFocus={() => 0}
					onMouseOut={removeIconActive.bind(this)}
					onBlur={() => 0}>
					{img}
				</a>
			);
		}
	);

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
