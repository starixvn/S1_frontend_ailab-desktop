import React from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import useAppDownLoad from "../appDownload/useAppDownLoad";
import path from "../../router";

export const SideBarDownload = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const androidDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<div className="quickLink app">
			<div onClick={() => navigate(`/${path.appDownload.root}`)}>
				<i className="icon icon-download" />
				<span>{t("lbl_Download")}</span>
			</div>
			<div>
				<ul>
					{androidDownLoadUrl && (
						<li>
							<a href={androidDownLoadUrl}>{t("lbl_Android")}</a>
							<QRCode
								value={androidDownLoadUrl}
								includeMargin={true}
							/>
						</li>
					)}

					{IOSDownloadUrl && (
						<li>
							<a href={IOSDownloadUrl}>{t("lbl_IOS")}</a>
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

export default SideBarDownload;
