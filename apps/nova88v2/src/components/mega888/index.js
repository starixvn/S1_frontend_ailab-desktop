import React, {
	useContext,
	createRef,
	useEffect,
	useState,
	useRef
} from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { useGotoGame } from "../hook/useGotoGame";
import { userInfoContext } from "../common/context";
import productList, { defDeepLinkId } from "../../datas/productList";
import InstallGuide from "./installGuide";
import config, { bannerImgUrl } from "../../config";
import { api_player_GetDeepLink } from "../../service/api/player";
import usePopBox from "../hook/usePopBox";

const downloadLink = {
	ios: "itms-services://?action=download-manifest&url=https://appsetup.gdsenmu.com/ios/plist/Mega888_1.plist",
	android: "https://appsetup.huafaw.com/apk/Mega888_V1.2.apk",
	windows: "https://appsetup.huafaw.com/pc/Mega888.zip"
};

const defType = {
	Android: 1,
	IOS: 2,
	WindowsPC: 3
};

const Component = () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);
	const [linkList, setLinkList] = useState([]);
	const { data } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		tpId: productList.mega888.tpId,
		tpGameType: productList.mega888.tpGameType,
		allowBeforeLogin: true
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_player_GetDeepLink({
			deepLinkId: defDeepLinkId.mega888,
			siteId: config.siteId
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { errorCode, message, data: _data } = res.data;
				if (errorCode === 0) {
					setLinkList(_data);
				} else {
					errorPopBox(message || `error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	}, []);

	const getLink = type => linkList?.find(el => type === el.type)?.deepLink;

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
											href={
												getLink(defType.Android) ??
												downloadLink.android
											}
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
											<QRCode
												value={
													getLink(defType.Android) ??
													downloadLink.android
												}
												renderAs="svg"
												size={120}
												includeMargin={true}
											/>
										</div>
									</div>
									<div className="downloadItem">
										<a
											className="downloadBtn"
											target="_blank"
											rel="noreferrer"
											href={
												getLink(defType.IOS) ??
												downloadLink.ios
											}>
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
											<QRCode
												value={
													getLink(defType.IOS) ??
													downloadLink.ios
												}
												renderAs="svg"
											/>
										</div>
									</div>
									<div className="downloadItem">
										<a
											className="downloadBtn"
											target="_blank"
											rel="noreferrer"
											href={
												getLink(defType.WindowsPC) ??
												downloadLink.windows
											}>
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

ButtonWithCopyBtn.propTypes = {
	value: PropTypes.string.isRequired
};

export default Component;
