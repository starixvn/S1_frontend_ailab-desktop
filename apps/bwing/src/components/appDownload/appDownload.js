import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext } from "../common/context";
import img_applogo from "../../styles/img/logo.png";
// import img_appbanner from "../../styles/img/download/downloadbanner.png";
import img_ios_QRCode from "../../styles/img/download/IQR.jpg";
import img_ios from "../../styles/img/download/ios.png";
import img_android_QRCode from "../../styles/img/download/AQR.jpg";
import img_android from "../../styles/img/download/Android.png";
// import img_iosicon from "../../styles/img/download/iosicon.png";

import img_in01 from "../../styles/img/download/dlimg1.png";
import img_in02 from "../../styles/img/download/dlimg2.png";
import img_in03 from "../../styles/img/download/dlimg3.png";
import img_in04 from "../../styles/img/download/dlimg4.png";

const AppDownload = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const onClickToDownload = e => {
		return typeof window !== undefined ? window.open(e.target.value) : null;
	};

	const androidLink =
		"https://mars.fadatsai88.com/v1/App?path=bwing_sports_android.apk";

	return (
		<main className="downloadArea">
			<div className="downloadT">
				<Link to={`/${userInfo.langId}`}>
					<img className="logo" src={img_applogo} alt="img_applogo" />
				</Link>
				<h1>{t("lbl_APP_DOWNLOAD")}</h1>
				<div className="downloadFrame">
					<p>{t("lbl_Scan_to_Download")}</p>
					<div>
						<div>
							<img src={img_android} alt="img_android" />
							<button
								onClick={onClickToDownload}
								value={androidLink}>
								{t("lbl_Android")}
							</button>
						</div>
						<img
							src={img_android_QRCode}
							alt="img_android_QRCode"
						/>
					</div>
					{/* <div>
						<div>
							<img src={img_ios} alt="img_ios" />
							<button onClick={onClickToDownload} value={iosLink}>
								{t("lbl_iOS")}
							</button>
						</div>
						<img src={img_ios_QRCode} alt="img_ios_QRCode" />
					</div> */}
				</div>
			</div>
			{/* <div className="downloadB">
				<h1>{t("lbl_Installation_tutorial")}</h1>
				<p>{t("lbl_Once_Bwing_App_is_installed")}</p>
				<div>
					<img src={img_in01} alt="img_guide01" />
					<img src={img_in02} alt="img_guide02" />
					<img src={img_in03} alt="img_guide03" />
					<img src={img_in04} alt="img_guide04" />
				</div>
			</div> */}
		</main>
	);
};

export default AppDownload;
