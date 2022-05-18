import { useState, useEffect, useRef } from "react";
import usePopBox from "./usePopBox";
import { api_site_GetSocialChannel } from "../../service/api/site";

export const defDisplayPage = {
	Home: 1,
	ContactUs: 2
};

export const defChannelName = {
	LivaChat: "LivaChat",
	WhatsApp: "WhatsApp",
	Telegram: "Telegram",
	Email: "E-mail",
	Facebook: "Facebook",
	Twitter: "Twitter",
	Instagram: "Instagram",
	LINE: "LINE"
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
