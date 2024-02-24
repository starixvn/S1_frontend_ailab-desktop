import React, { useContext } from "react";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import useGetSocialChannel, {
	defDisplayPage,
	defLinkType
} from "../hook/useGetSocialChannel";

export const SideBarContactUs = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const { socialChannel } = useGetSocialChannel({
		langId: userInfo.langId,
		displayPage: defDisplayPage.Home
	});

	const snsList = socialChannel
		.filter(el => el.channelName !== "Livechat")
		.map(el => {
			return (
				el.linkType === defLinkType.qrCode && (
					<li key={el.id}>
						<a
							key={`sidebar-link-${el.channelName}`}
							href={el.link}
							target="_blank"
							rel="noreferrer"
						>
							{el.channelName}
						</a>
						{el.channelName === "Zalo" ? (
							<img
								src="https://socialchannel.0814media.net/BWING/BWING_Zalo.png"
								alt="Zalo"
							/>
						) : (
							<QRCode
								value={el.link}
								renderAs="svg"
								size={150}
								includeMargin={true}
							/>
						)}
					</li>
				)
			);
		});

	return (
		<div className="quickLink contact">
			<div>
				<i className="icon-contact" />
				<span>{t("lbl_ContactUs").toUpperCase()}</span>
			</div>
			<div>
				<ul>{snsList}</ul>
			</div>
		</div>
	);
};

export default SideBarContactUs;
