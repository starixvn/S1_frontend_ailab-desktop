import React, { useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { userInfoContext } from "../common/context";
import { useAppDownLoad } from "./useAppDownLoad";
import { bannerImgUrl } from "../../config";

const AppDownload = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const { userInfo } = useContext(userInfoContext);

	const androidDownLoadUrl = appLinkDatas?.Android?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<main className="app_page">
			<section className="inside">
				<div className="top">
					<Link to={`/${userInfo.langId}`}>
						<div className="logo">
							<img
								src={`${bannerImgUrl}/desktop/img/appdownload/logo.png`}
								alt="appdownload-logo-img"
							/>
						</div>
					</Link>

					<div className="title">{t("lbl_APP_DOWNLOAD")}</div>
					<img
						className="visual"
						src={`${bannerImgUrl}/desktop/img/appdownload/bg-item.png`}
						alt="appdownload-bg-img"
					/>
					<div className="qrcode">
						<div className="qrcode-title">
							{t("lbl_Scan_to_Download")}
						</div>
						<div className="container">
							{androidDownLoadUrl && (
								<div className="qrcode-item">
									<QRCode
										value={androidDownLoadUrl}
										renderAs="svg"
										size={135}
										includeMargin={true}
									/>

									<div className="right">
										<img
											src={`${bannerImgUrl}/desktop/img/appdownload/android.svg`}
											alt="appdownload-android-img"
										/>
										Android
									</div>
								</div>
							)}

							{IOSDownloadUrl && (
								<div className="qrcode-item">
									<QRCode
										value={IOSDownloadUrl}
										renderAs="svg"
										size={135}
										includeMargin={true}
									/>
									<div className="right">
										<img
											src={`${bannerImgUrl}/desktop/img/appdownload/ios.svg`}
											alt="appdownload-img-ios-icon"
										/>
										iOS
									</div>
								</div>
							)}
						</div>
						<div className="btn-group">
							{androidDownLoadUrl && (
								<a
									className="download"
									href={androidDownLoadUrl}
									target="_blank"
									rel="noreferrer">
									{t("lbl_Download")} (Android)
								</a>
							)}

							{IOSDownloadUrl && (
								<a
									className="download"
									href={IOSDownloadUrl}
									target="_blank"
									rel="noreferrer">
									{t("lbl_Download")} (iOS)
								</a>
							)}
						</div>
					</div>
				</div>
				<div className="bottom">
					<div className="title">
						{t("lbl_Installation_tutorial")}
					</div>

					<div className="container">
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/appdownload/1.png`}
								alt="appdownload-img-step1"
							/>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/appdownload/2.png`}
								alt="appdownload-img-step2"
							/>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/appdownload/3.png`}
								alt="appdownload-img-step3"
							/>
						</div>
						<div className="item">
							<img
								src={`${bannerImgUrl}/desktop/img/appdownload/4.png`}
								alt="appdownload-img-step4"
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default AppDownload;
