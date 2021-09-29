import React, { useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { userInfoContext } from "../common/context";
import { useAppDownLoad } from "./useAppDownLoad";

import imgLogo from "../../styles/img/appdownload/logo.png";
import imgBGItem from "../../styles/img/appdownload/bg-item.png";
import imgAndroid from "../../styles/img/appdownload/android.svg";
import imgIosIcon from "../../styles/img/appdownload/ios.svg";
import imgStep1 from "../../styles/img/appdownload/1.png";
import imgStep2 from "../../styles/img/appdownload/2.png";
import imgStep3 from "../../styles/img/appdownload/3.png";
import imgStep4 from "../../styles/img/appdownload/4.png";

const AppDownload = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const { userInfo } = useContext(userInfoContext);

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<main className="app_page">
			<section className="inside">
				<div className="top">
					<Link to={`/${userInfo.langId}`}>
						<div className="logo">
							<img src={imgLogo} alt="appdownload-logo-img" />
						</div>
					</Link>

					<div className="title">{t("lbl_APP_DOWNLOAD")}</div>
					<img
						className="visual"
						src={imgBGItem}
						alt="appdownload-bg-img"
					/>
					<div className="qrcode">
						<div className="qrcode-title">
							{t("lbl_Scan_to_Download")}
						</div>
						<div className="container">
							{andriodDownLoadUrl && (
								<div className="qrcode-item">
									<QRCode
										value={andriodDownLoadUrl}
										renderAs="svg"
										size={135}
										includeMargin={true}
									/>

									<div className="right">
										<img
											src={imgAndroid}
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
											src={imgIosIcon}
											alt="appdownload-img-ios-icon"
										/>
										iOS
									</div>
								</div>
							)}
						</div>
						<div className="btn-group">
							{andriodDownLoadUrl && (
								<a
									className="download"
									href={andriodDownLoadUrl}
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
					<div className="subtitle">
						<div>{t("lbl_iOS_App_Trust_Authentication")}</div>
						{t("lbl_Appdownload_Subtitle", {
							site: "Goal123"
						})}
					</div>
					<div className="container">
						<div className="item">
							<img src={imgStep1} alt="appdownload-img-step1" />
						</div>
						<div className="item">
							<img src={imgStep2} alt="appdownload-img-step2" />
						</div>
						<div className="item">
							<img src={imgStep3} alt="appdownload-img-step3" />
						</div>
						<div className="item">
							<img src={imgStep4} alt="appdownload-img-step4" />
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default AppDownload;
