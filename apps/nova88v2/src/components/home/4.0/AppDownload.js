import React from "react";
import QRCode from "qrcode.react";
import { Link } from "gatsby";
import { useGetAppLinksQuery, AppTypeEnum } from "@ailab-desktop/service";
import { Trans, useTranslation } from "react-i18next";
import paths from "../../../router";
import { useAuth } from "../../hook";

const { Andriod, IOS } = AppTypeEnum;

const AppDownload = () => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();
	const { data: { data: appLinks } = {}, isFetching: isGetAppLinksFetching } =
		useGetAppLinksQuery();

	const andriodItem = appLinks?.find(({ appType }) => appType === Andriod);
	const IOSItem = appLinks?.find(({ appType }) => appType === IOS);

	if (isGetAppLinksFetching) return null;

	return (
		<div className="appdownload">
			<div className="appdownload-text">
				<div>{t("lbl_APP_DOWNLOAD")}</div>
				<div>
					<Trans
						i18nKey="Label_AppDownload_Title"
						components={{
							span: <span />
						}}
					/>
				</div>
				<div>{t("Label_AppDownload_SubTitle")}</div>
			</div>
			<div className="app-qrcode">
				<div className="app-qrcode-item">
					{IOSItem?.downloadLink && (
						<QRCode
							value={IOSItem?.downloadLink}
							renderAs="svg"
							size={152}
							includeMargin={true}
						/>
					)}

					<div>
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/apple.png`}
							alt=""
						/>
						<span>{IOSItem?.appTypeName}</span>
					</div>

					<Link to={`/${userInfo.langId}/${paths.appDownload.root}`}>
						{t("Label_AppDownload_Instructions")}
					</Link>
				</div>
				<div className="app-qrcode-item">
					{andriodItem?.downloadLink && (
						<QRCode
							value={andriodItem?.downloadLink}
							renderAs="svg"
							size={152}
							includeMargin={true}
						/>
					)}

					<div>
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/android.png`}
							alt="img-android"
						/>
						<span>{andriodItem?.appTypeName}</span>
					</div>
					<Link to={`/${userInfo.langId}/${paths.appDownload.root}`}>
						{t("Label_AppDownload_Instructions")}
					</Link>
				</div>
			</div>
			<div className="player">
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/player.png`}
					alt="img-player"
				/>
			</div>
		</div>
	);
};

export default AppDownload;
