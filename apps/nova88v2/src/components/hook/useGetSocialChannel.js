import { useState, useEffect, useRef } from "react";
import usePopBox from "./usePopBox";
import { api_site_GetSocialChannel } from "../../service/api/site";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2,
	App: 3,
	Footer: 4
};

export const buttonTypeList = ["Livachat"];

export const sideBarIconName = {
	Livechat: "icon icon icon-chat",
	WhatsApp: "icon icon-whatsapp",
	Telegram: "icon icon-telegram",
	"E-mail": "icon icon icon-envelope",
	Facebook: "icon icon-facebook2",
	Twitter: "icon icon-twitter",
	Instagram: "icon icon-instagram",
	LINE: "icon icon-line",
	Youtube: "icon icon-youtube"
};

export const defLinkType = {
	url: 1,
	qrCode: 2
};

export const footerImgName = {
	Youtube: "yta.png",
	Telegram: "tga.png",
	Facebook: "fba.png",
	Twitter: "twa.png",
	Instagram: "ina.png",
	Pinterest: "pta.png",
	WhatsApp: "waa.png",
	"E-mail": "ema.png",
	Livechat: "chat.png",
	LINE: "line.png"
};

const useGetSocialChannel = ({ langId, currencyId, displayPage }) => {
	const [socialChannel, setSocialChannel] = useState([]);
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const getChannel = async () => {
		await api_site_GetSocialChannel({
			langId,
			currencyId,
			displayPage
		}).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, data, message } = res.data;
				if (errorCode === 0) {
					setSocialChannel(data);
				} else {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	useEffect(() => {
		getChannel();
	}, []);

	return { socialChannel };
};

export default useGetSocialChannel;
