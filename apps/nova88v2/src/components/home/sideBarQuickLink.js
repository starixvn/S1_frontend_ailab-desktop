/* eslint-disable react/no-array-index-key */
import React, { useState, useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { langAndCurrMapping } from "../common/common";
import useGetSocialChannel, {
	defDisplayPage,
	buttonTypeList,
	sideBarIconName,
	defLinkType
} from "../hook/useGetSocialChannel";

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

	const iconList = socialChannel.map((el, idx) => {
		const qrCode = el.linkType === defLinkType.qrCode && (
			<div key={`sidebar-link-${el.channelName}`}>
				{el.title}
				<QRCode
					value={el.link}
					renderAs="svg"
					size={120}
					includeMargin={true}
				/>
			</div>
		);

		if (buttonTypeList.includes(el.channelName)) {
			return (
				<button
					key={`sidebar-link-${idx}`}
					onClick={() => el.onClick() ?? null}
					className={`${sideBarIconName[el.channelName]}${
						activeIcon === idx ? " active" : ""
					}`}
					onMouseOver={switchIconActive.bind(this, idx)}
					onFocus={() => 0}
					onMouseOut={removeIconActive.bind(this)}
					onBlur={() => 0}>
					{qrCode}
				</button>
			);
		}

		return (
			<a
				key={`sidebar-link-${idx}`}
				href={el.link}
				target="_blank"
				rel="noreferrer"
				className={`${sideBarIconName[el.channelName]}${
					activeIcon === idx ? " active" : ""
				}`}
				onMouseOver={switchIconActive.bind(this, idx)}
				onFocus={() => 0}
				onMouseOut={removeIconActive.bind(this)}
				onBlur={() => 0}>
				{qrCode}
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
