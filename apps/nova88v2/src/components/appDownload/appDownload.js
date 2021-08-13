import React from "react";
import { useTranslation } from "react-i18next";
import img_applogo from "../../styles/img/app/applogo.png";
import img_appbanner from "../../styles/img/app/appbanner.png";
import img_ios from "../../styles/img/app/ios.png";
import img_android from "../../styles/img/app/and.png";
import img_iosicon from "../../styles/img/app/iosicon.png";
import img_in01 from "../../styles/img/app/in01.png";
import img_in02 from "../../styles/img/app/in02.png";
import img_in03 from "../../styles/img/app/in03.png";
import img_in04 from "../../styles/img/app/in04.png";
import { cloudImgUrl } from "../../config";

export const iosLink = "https://nova.jsybyny.com";
export const androidLink = "https://dl.4ppstore.com/dlapp/Nova88.apk";

const AppDownload = () => {
	const { t } = useTranslation();

	// const onClickToDownload = e => {
	// 	return typeof window !== undefined ? window.open(e.target.value) : null;
	// };

	return (
		<>
			<div className="appHeader">
				<a>
					<img src={img_applogo} alt="img_applogo" />
				</a>
			</div>
			<div className="appPage">
				<div className="appTitle">{t("lbl_APP_DOWNLOAD")}</div>
				<img src={img_appbanner} alt="img_appbanner" />
				<div className="scan">
					<div>
						<div />
						<div>{t("lbl_SCAN_ME_NOW")}</div>
					</div>
					<div>
						<div>
							<img
								src={`${cloudImgUrl}/SiteSkin/img/ios_qr.png`}
								alt="img_ios_QRCode"
							/>
							<div>
								<div>
									<img src={img_ios} alt="img_ios" />
									{t("lbl_iOS")}
								</div>
								<a
									href={iosLink}
									target="_blank"
									rel="noreferrer">
									<button>{t("lbl_DOWNLOAD")}</button>
								</a>
							</div>
						</div>
						<div>
							<img
								src={`${cloudImgUrl}/SiteSkin/img/android_qr.png`}
								alt="img_android_QRCode"
							/>
							<div>
								<div>
									<img src={img_android} alt="img_android" />
									{t("lbl_Android")}
								</div>
								<a href={androidLink} download rel="noreferrer">
									<button>{t("lbl_DOWNLOAD")}</button>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="install">
					<div>{t("lbl_Installation_tutorial")}</div>
					<div>
						<img src={img_iosicon} alt="img_iosicon" />
						{t("lbl_iOS_App_Trust_Authentication")}
					</div>
					<div>{t("lbl_Once_Nova88_App_is_installed")}</div>
					<div>
						<img src={img_in01} alt="img_guide01" />
						<img src={img_in02} alt="img_guide02" />
						<img src={img_in03} alt="img_guide03" />
						<img src={img_in04} alt="img_guide04" />
					</div>
				</div>
			</div>
		</>
	);
};

export default AppDownload;
