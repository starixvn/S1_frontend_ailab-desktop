import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import QRCode from "qrcode.react";
import { userInfoContext } from "../common/context";
import useAppDownLoad from "./useAppDownLoad";

import img_applogo from "../../styles/img/logo.png";
import img_ios from "../../styles/img/download/ios.png";

import img_android from "../../styles/img/download/Android.png";

import img_in01 from "../../styles/img/download/dlimg1.png";
import img_in02 from "../../styles/img/download/dlimg2.png";
import img_in03 from "../../styles/img/download/dlimg3.png";
import img_in04 from "../../styles/img/download/dlimg4.png";

const AppDownload = () => {
	const { t } = useTranslation();
	const { appLinkDatas } = useAppDownLoad();

	const { userInfo } = useContext(userInfoContext);
	const onClickToDownload = e => {
		return typeof window !== undefined ? window.open(e.target.value) : null;
	};

	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<main className="downloadArea">
			<div className="downloadT">
				<Link to={`/${userInfo.langId}`}>
					<img className="logo" src={img_applogo} alt="img_applogo" />
				</Link>
				<h1>{t("lbl_APP_DOWNLOAD")}</h1>
				<div className="downloadFrame">
					<p>{t("lbl_Scan_to_Download")}</p>

					{andriodDownLoadUrl && (
						<div>
							<div>
								<img src={img_android} alt="img_android" />
								<button
									onClick={onClickToDownload}
									value={andriodDownLoadUrl}>
									{t("lbl_Android")}
								</button>
							</div>

							<QRCode
								value={andriodDownLoadUrl}
								renderAs="svg"
								size={152}
								includeMargin={true}
							/>
						</div>
					)}
					{IOSDownloadUrl && (
						<div>
							<div>
								<img src={img_ios} alt="img_ios" />
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
					<img src={img_in01} alt="img_guide01" />
					<img src={img_in02} alt="img_guide02" />
					<img src={img_in03} alt="img_guide03" />
					<img src={img_in04} alt="img_guide04" />
				</div>
			</div>
		</main>
	);
};

export default AppDownload;
