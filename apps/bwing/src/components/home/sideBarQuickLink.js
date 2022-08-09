import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import useGetSocialChannel, {
	defDisplayPage,
	defChannelName,
	defLinkType,
	channelIcon
} from "../hook/useGetSocialChannel";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Home
	});

	const livechatData = socialChannel?.find(
		el => el.channelName === defChannelName.LiveChat
	);

	const snsList = socialChannel
		.filter(el => el.channelName !== "Livechat")
		.map(el => {
			const qrCode = el.linkType === defLinkType.qrCode && (
				<QRCode
					value={el.link}
					renderAs="svg"
					size={150}
					includeMargin={true}
				/>
			);

			return (
				<li>
					<a
						key={`sidebar-link-${el.channelName}`}
						href={el.link}
						target="_blank"
						rel="noreferrer">
						<div className={channelIcon[el.channelName]}>
							{el.channelName}
						</div>
					</a>
					{qrCode}
				</li>
			);
		});

	return (
		<div className="quickLink">
			<div>
				{livechatData && (
					<button className="icon icon-chat" onClick={openLiveChat} />
				)}
				<i className="icon icon-contactIcon">
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>{snsList}</ul>
			</div>
		</div>
	);
};
