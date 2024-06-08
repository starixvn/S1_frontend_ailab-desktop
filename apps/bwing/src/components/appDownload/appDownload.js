import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import QRCode from "qrcode.react";
import { userInfoContext } from "../common/context";
import useAppDownLoad from "./useAppDownLoad";
import { bannerImgUrl } from "../../config";

const AppDownload = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const { userInfo } = useContext(userInfoContext);
	const onClickToDownload = e => {
		return typeof window !== undefined ? window.open(e.target.value) : null;
	};

	const androidDownLoadUrl = appLinkDatas?.Android?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<main className="downloadArea">
			<div className="downloadT">
				<Link to={`/${userInfo.langId}`}>
					<img
						className="logo"
						src={`${bannerImgUrl}/desktop/img/4.0/logo.png`}
						alt="img_applogo"
					/>
				</Link>
				<h1>{t("lbl_APP_DOWNLOAD")}</h1>
				<div className="downloadFrame">
					<p>{t("lbl_Scan_to_Download")}</p>

					{androidDownLoadUrl && (
						<div>
							<div>
								<img
									src={`${bannerImgUrl}/desktop/img/download/android.png`}
									alt="img_android"
								/>
								<button
									onClick={onClickToDownload}
									value={androidDownLoadUrl}>
									{t("lbl_Android")}
								</button>
							</div>

							<QRCode
								value={androidDownLoadUrl}
								renderAs="svg"
								size={152}
								includeMargin={true}
							/>
						</div>
					)}
					{IOSDownloadUrl && (
						<div>
							<div>
								<img
									src={`${bannerImgUrl}/desktop/img/download/ios.png`}
									alt="img_ios"
								/>
								<button
									onClick={onClickToDownload}
									value={IOSDownloadUrl}>
									iOS
								</button>
							</div>

							<QRCode
								value={IOSDownloadUrl}
								renderAs="svg"
								size={152}
								includeMargin={true}
							/>
						</div>
					)}
				</div>
			</div>
			<div className="downloadB">
				<h1>{t("lbl_Installation_tutorial")}</h1>
				<p>{t("lbl_Once_Bwing_App_is_installed")}</p>
				<div>
					<img
						src={`${bannerImgUrl}/desktop/img/download/dlimg1.png`}
						alt="img_guide01"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/download/dlimg2.png`}
						alt="img_guide02"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/download/dlimg3.png`}
						alt="img_guide03"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/download/dlimg4.png`}
						alt="img_guide04"
					/>
				</div>
			</div>
		</main>
	);
};

export default AppDownload;
