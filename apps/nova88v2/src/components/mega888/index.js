import React, { useContext, createRef } from "react";
import { useTranslation } from "react-i18next";
import { useGotoGame } from "../hook/useGotoGame";
import { userInfoContext } from "../common/context";
import productList from "../../datas/productList";
import InstallGuide from "./installGuide";
import { bannerImgUrl } from "../../config";

const downloadLink = {
	ios: "itms-services://?action=download-manifest&url=https://appsetup.huafaw.com/ios/plist/Mega888_0.plist",
	android: "https://appsetup.huafaw.com/apk/Mega888_V1.2.apk",
	windows: "https://appsetup.huafaw.com/pc/Mega888.zip"
};

const Component = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: productList.mega888.tpId,
		tpGameType: productList.mega888.tpGameType,
		allowBeforeLogin: true
	});

	return (
		<section className="inside">
			<div className="rightModule">
				<div className="installGuide mega">
					<div className="megaStyle">
						<div className="top">
							<img
								src={`${bannerImgUrl}/desktop/img/mega_side.png`}
								alt="mega_side"
							/>
							<div>
								<div>
									<div className="title">Mega888</div>
									<div className="downloadItem">
										<div className="title">
											{t("lbl_Username")}
										</div>
										<ButtonWithCopyBtn
											value={data?.account}
										/>
									</div>
									<div className="downloadItem">
										<div className="title">
											{t("lbl_Password")}
										</div>
										<ButtonWithCopyBtn
											value={data?.password}
										/>
									</div>
								</div>
								<div>
									<div className="downloadItem">
										<a
											className="downloadBtn"
											href={downloadLink.android}
											target="_blank"
											rel="noreferrer">
											<i className="icon icon-android" />
											<div>
												{t("mega888.app_for_android")}
												<br />
												APK
											</div>
										</a>
										<div className="downloadQR">
											<i className="icon icon-android">
												<span>Android</span>
											</i>
											<img
												src={`${bannerImgUrl}/desktop/img/android-mega.png`}
												alt="Android"
											/>
										</div>
									</div>
									<div className="downloadItem">
										<a
											className="downloadBtn"
											target="_blank"
											rel="noreferrer"
											href={downloadLink.ios}>
											<i className="icon icon-appleinc" />
											<div>
												{t("mega888.app_for_ios")}
												<br />
												IOS 64Bit (iPhone 5s +)
											</div>
										</a>
										<div className="downloadQR">
											<i className="icon icon-appleinc">
												<span>iOS</span>
											</i>
											<img
												src={`${bannerImgUrl}/desktop/img/ios-mega.png`}
												alt="iOS"
											/>
										</div>
									</div>
									<div className="downloadItem">
										<a
											className="downloadBtn"
											target="_blank"
											rel="noreferrer"
											href={downloadLink.windows}>
											<i className="icon icon-windows" />
											<div>
												Windows PC
												<br />
												{t("mega888.unzip_and_run")}:
												Mega888.exe
											</div>
										</a>
									</div>
								</div>
							</div>
						</div>
						<InstallGuide t={t} />
					</div>
				</div>
			</div>
		</section>
	);
};

const ButtonWithCopyBtn = ({ value }) => {
	const ipt = createRef();
	const OnCopy = () => {
		ipt.current.select();
		document.execCommand("copy");
	};
	return (
		<div className="readonly">
			<input readOnly defaultValue={value} ref={ipt} />
			<button
				className="icon icon-files-empty"
				value={value}
				onClick={OnCopy}
			/>
		</div>
	);
};

export default Component;
