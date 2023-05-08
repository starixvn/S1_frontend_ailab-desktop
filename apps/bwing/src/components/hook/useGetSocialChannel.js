import { useState, useEffect, useRef } from "react";
import usePopBox from "./usePopBox";
import { api_site_GetSocialChannel } from "../../service/api/site";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2,
	App: 3,
	Footer: 4
};

export const defLinkType = {
	url: 1,
	qrCode: 2
};

export const defChannelName = {
	LiveChat: "Livechat",
	Telegram: "Telegram",
	Facebook: "Facebook",
	Skype: "Skype",
	Zalo: "Zalo"
};

export const channelIcon = {
	Youtube: "icon icon-youtube",
	Telegram: "icon icon-Telegram",
	Facebook: "icon icon-facebook",
	Twitter: "icon icon-twitter",
	Skype: "icon icon-contactUS6",
	Zalo: "icon icon-zalo",
	Tiktok: "icon icon-tiktok",
	Livechat: "icon icon-chat"
};

const useGetSocialChannel = ({ langId, displayPage }) => {
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
				// 在首頁網路斷線時會進來這個 catch，故不特別做錯誤處理
			}
		);
	};

	useEffect(() => {
		getChannel();
	}, []);

	return { socialChannel };
};

export default useGetSocialChannel;
