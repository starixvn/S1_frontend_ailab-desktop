import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import path from "../../../router";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";
import { useAppDownLoad } from "../../appDownload/useAppDownLoad";

//  appLinkDatas api : /api/Player/GetAppLink

const HomeAppDownload = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const { appLinkDatas } = useAppDownLoad();
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const iOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";
	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<div className="home-app">
			<div className="app-content">
				<div className="app-title">
					<img
						className="app-title-icon"
						src={`${bannerImgUrl}/desktop/img/home-page/goal123-appicon.png`}
						alt="home-appIcon"
					/>
					<div className="app-title-text">
						<div className="text">
							<span>{t("lbl_Home_GreatGames")}</span>
							<span>{t("lbl_Home_OnAllDevices")}</span>
						</div>
						<div className="text">
							<img
								className="brand"
								src={`${bannerImgUrl}/desktop/img/home-page/goal123-brand.png`}
								alt="home-brand"
							/>
							<span>{t("lbl_Home_New") + t("lbl_Home_App")}</span>
						</div>
					</div>
				</div>
				<span>{t("lbl_Home_SignupPromotion")}</span>
				<div className="app-qrcode">
					<div className="app-item">
						<QRCode
							className="qr"
							value={andriodDownLoadUrl}
							includeMargin={true}
						/>
						<button
							className="btn-app"
							style={{ cursor: "default" }}>
							<i className="icon-android" />
							{t("lbl_Home_Android")}
						</button>
						<a
							className="instructions"
							href={`/${userInfo.langId}/${path.appDownload.root}`}>
							{t("lbl_Home_Instructions")}
						</a>
					</div>
					<div className="app-item">
						<QRCode
							className="qr"
							value={iOSDownloadUrl}
							includeMargin={true}
						/>
						<button
							className="btn-app"
							style={{ cursor: "default" }}>
							<i className="icon-apple" />
							{t("lbl_Home_Apple")}
						</button>
						<a
							className="instructions"
							href={`/${userInfo.langId}/${path.appDownload.root}`}>
							{t("lbl_Home_Instructions")}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeAppDownload;
