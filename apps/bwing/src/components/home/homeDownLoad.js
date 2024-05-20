import React from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { navigate } from "gatsby";
import { bannerImgUrl } from "../../config";
import path from "../../router";

const HomeDownLoad = ({ appLinkDatas }) => {
	const { t } = useTranslation();
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";

	return (
		<div className="col-12">
			<div className="home-download mb-6">
				<div className="home-download-left">
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/logo.png`}
						alt=""
					/>
					<div className="home-download-content">
						<div>{t("lbl_Home_Download_Description1")}</div>
						<div>
							<span>{t("lbl_Home_Download_Description2")}</span>
							<span>{t("lbl_Home_Download_Description3")}</span>
						</div>

						<QRCode
							value={andriodDownLoadUrl}
							includeMargin={true}
						/>
						<a
							onClick={() =>
								navigate(`/${path.appDownload.root}`)
							}
						>
							{t("lbl_App_Download_Guide")}
						</a>
					</div>
				</div>
				<div className="home-download-right">
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/app.png`}
						alt=""
					/>
					<div>{t("lbl_PoweredBy")}</div>
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/bong88.png`}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

HomeDownLoad.defaultProps = {
	appLinkDatas: undefined
};

HomeDownLoad.propTypes = {
	appLinkDatas: {
		Andriod: {
			downloadLink: ""
		},
		IOS: {
			downloadLink: ""
		}
	}
};

export default HomeDownLoad;
