import React from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { bannerImgUrl } from "../../config";
import useAppDownLoad from "./useAppDownLoad";

const AppDownload = () => {
	const { t } = useTranslation();

	const { appLinkDatas } = useAppDownLoad();
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	// const onClickToDownload = e => {
	// 	return typeof window !== undefined ? window.open(e.target.value) : null;
	// };

	return (
		<>
			<div className="appHeader">
				<a>
					<img
						src={`${bannerImgUrl}/desktop/img/app/applogo.png`}
						alt="img_applogo"
					/>
				</a>
			</div>
			<div className="appPage">
				<div className="appTitle">{t("lbl_APP_DOWNLOAD")}</div>
				<img
					src={`${bannerImgUrl}/desktop/img/app/appbanner.png`}
					alt="img_appbanner"
				/>
				<div className="scan">
					<div>
						<div />
						<div>{t("lbl_SCAN_ME_NOW")}</div>
					</div>
					<div>
						<div>
							{IOSDownloadUrl && (
								<QRCode
									value={IOSDownloadUrl}
									renderAs="svg"
									size={152}
									includeMargin={true}
								/>
							)}

							<div>
								<div>
									<img
										src={`${bannerImgUrl}/desktop/img/app/ios.png`}
										alt="img_ios"
									/>

									{t("lbl_iOS")}
								</div>
								<a
									href={IOSDownloadUrl}
									target="_blank"
									rel="noreferrer">
									<button>{t("lbl_DOWNLOAD")}</button>
								</a>
							</div>
						</div>
						<div>
							{andriodDownLoadUrl && (
								<QRCode
									value={andriodDownLoadUrl}
									renderAs="svg"
									size={152}
									includeMargin={true}
								/>
							)}

							<div>
								<div>
									<img
										src={`${bannerImgUrl}/desktop/img/app/and.png`}
										alt="img_android"
									/>
									{t("lbl_Android")}
								</div>
								<a
									href={andriodDownLoadUrl}
									download
									rel="noreferrer">
									<button>{t("lbl_DOWNLOAD")}</button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="install">
					<div>{t("lbl_Installation_tutorial")}</div>
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/app/iosicon.png`}
							alt="img_iosicon"
						/>
						{t("lbl_iOS_App_Trust_Authentication")}
					</div>
					<div>{t("lbl_Once_Nova88_App_is_installed")}</div>
					<div>
						<img
							src={`${bannerImgUrl}/desktop/img/app/in01.png`}
							alt="img_guide01"
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/app/in02.png`}
							alt="img_guide02"
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/app/in03.png`}
							alt="img_guide03"
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/app/in04.png`}
							alt="img_guide04"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppDownload;
