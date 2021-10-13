import React, { useState, useContext } from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { userInfoContext } from "../common/context";
import { useAppDownLoad } from "../appDownload/useAppDownLoad";

import path from "../../router";

import androidIconImg from "../../styles/img/android.svg";
import iosIconImg from "../../styles/img/ios.svg";

const higherToTheAngpowZIndex = 3;
const orignZIndex = 2;

const QuickdownloadLink = () => {
	const { t } = useTranslation();
	const [active, setActive] = useState(false);
	const { userInfo } = useContext(userInfoContext);
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<div
			onFocus={() => 0}
			onMouseOver={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			className={`quickdownload${active ? " active" : ""}`}
			style={{ zIndex: active ? higherToTheAngpowZIndex : orignZIndex }}>
			<div onClick={async () => setActive(false)}>
				<button
					className="icon icon-mobile"
					onClick={() =>
						navigate(`/${userInfo.langId}/${path.appDownload.root}`)
					}
				/>

				<i
					className={
						active
							? "icon icon-cancel-circle"
							: "icon icon-circle-right"
					}>
					{t("lbl_Download").toUpperCase()}
				</i>
			</div>

			<div
				onFocus={() => 0}
				onMouseOver={() => setActive(true)}
				onMouseLeave={() => setActive(false)}>
				<ul>
					{andriodDownLoadUrl && (
						<li>
							<a
								href={andriodDownLoadUrl}
								target="_blank"
								rel="noreferrer">
								<img src={androidIconImg} alt="" />
								Android
							</a>

							<QRCode
								value={andriodDownLoadUrl}
								includeMargin={true}
							/>
						</li>
					)}

					{IOSDownloadUrl && (
						<li>
							<a
								href={IOSDownloadUrl}
								target="_blank"
								rel="noreferrer">
								<img src={iosIconImg} alt="iosIcon" />
								iOS
							</a>
							<QRCode
								value={IOSDownloadUrl}
								includeMargin={true}
							/>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default QuickdownloadLink;
