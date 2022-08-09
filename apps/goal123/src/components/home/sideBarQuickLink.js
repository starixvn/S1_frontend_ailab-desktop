import React, { useState, useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import useGetSocialChannel, {
	defDisplayPage,
	defChannelName,
	defLinkType,
	sideBarImgName
} from "../hook/useGetSocialChannel";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [active, setActive] = useState(false);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Home
	});

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

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
						<img
							src={`${bannerImgUrl}/desktop/img/${
								sideBarImgName[el.channelName]
							}`}
							alt={`img-${el.channelName}`}
						/>
						{el.channelName}
					</a>
					{qrCode}
				</li>
			);
		});

	return (
		<div
			onFocus={() => 0}
			onMouseOver={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			className={`quickLink${active ? " active" : ""}`}>
			<div onClick={() => setActive(false)}>
				{livechatData && (
					<button className="icon icon-chat" onClick={openLiveChat} />
				)}
				<i
					className={
						active
							? "icon icon-cancel-circle"
							: "icon icon-circle-right"
					}>
					{t("lbl_ContactUs").toUpperCase()}
				</i>
			</div>
			<div>{socialChannel.length > 0 && <ul>{snsList}</ul>}</div>
		</div>
	);
};
