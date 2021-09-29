import React from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import android from "../../styles/img/android.svg";
import ios from "../../styles/img/ios.svg";
import useAppDownLoad from "../appDownload/useAppDownLoad";
import path from "../../router";

export default ({ langId }) => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<div className="appdownload">
			<div>
				<button
					className="icon icon-mobile"
					onClick={() =>
						navigate(`${langId}/${path.appDownload.root}`)
					}
				/>
				<i className="icon icon-circle-right">{t("lbl_Download")}</i>
			</div>
			<div>
				<ul>
					{andriodDownLoadUrl && (
						<li>
							<a href={andriodDownLoadUrl}>
								<img src={android} alt="iosIcon" />
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
							<a href={IOSDownloadUrl}>
								<img src={ios} alt="iosIcon" />
								ios
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
