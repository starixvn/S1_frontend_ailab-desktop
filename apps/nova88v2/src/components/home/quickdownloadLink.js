import React, { useState } from "react";
import PropTypes from "prop-types";
import iosQRcodeImg from "../../styles/img/app/ios_en.png";
import androidQRcodeImg from "../../styles/img/app/android_en.png";
import { iosLink, androidLink } from "../appDownload/appDownload";

const defQRCodeName = {
	ios: "ios",
	android: "android"
};

const QuickdownloadLink = ({ t }) => {
	const [isShowIcon, setIsShowIcon] = useState(false);
	const [qrCodeName, setQrCodeName] = useState(null);

	const showQRcode = (_qrCodeName, url) => {
		setQrCodeName(_qrCodeName);
		if (typeof window !== undefined) window.open(url);
	};

	const onMouseLeaveIconBar = () => {
		setIsShowIcon(false);
		setQrCodeName(null);
	};

	return (
		<>
			<DownloadBar
				t={t}
				isShowIcon={isShowIcon}
				setIsShowIcon={setIsShowIcon}
			/>
			<IconBar
				t={t}
				isShowIcon={isShowIcon}
				qrCodeName={qrCodeName}
				showQRcode={showQRcode}
				onMouseLeaveIconBar={onMouseLeaveIconBar}
			/>
		</>
	);
};

export const DownloadBar = ({ t, isShowIcon, setIsShowIcon }) => {
	return (
		<div
			className={`quickLinkNew3 ${isShowIcon ? "active" : ""} `}
			onMouseOver={() => setIsShowIcon(true)}
			onFocus={() => 0}>
			<i className="icon icon-arrow-right2" />
			<div>{t("lbl_Download")}</div>
		</div>
	);
};

export const IconBar = ({
	isShowIcon,
	qrCodeName,
	showQRcode,
	onMouseLeaveIconBar,
	t
}) => {
	return (
		<div
			className={`quickLinkNew4 ${isShowIcon ? "" : "active"} `}
			onMouseLeave={onMouseLeaveIconBar}>
			<i className="icon icon-arrow-left2" />
			<button
				className={`icon icon-appleinc ${
					qrCodeName === defQRCodeName.ios ? "active" : ""
				}`}
				onClick={showQRcode.bind(this, defQRCodeName.ios, iosLink)}>
				{t("lbl_iOS")?.toUpperCase()}
				<div>
					<img src={iosQRcodeImg} alt="ios_qr" />
				</div>
			</button>
			<button
				className={`icon icon-android ${
					qrCodeName === defQRCodeName.android ? "active" : ""
				}`}
				onClick={showQRcode.bind(
					this,
					defQRCodeName.android,
					androidLink
				)}>
				{t("lbl_Android")?.toUpperCase()}
				<div>
					<img src={androidQRcodeImg} alt="android_qr" />
				</div>
			</button>
		</div>
	);
};

QuickdownloadLink.propTypes = {
	t: PropTypes.func.isRequired
};

DownloadBar.propTypes = {
	t: PropTypes.func.isRequired,
	isShowIcon: PropTypes.bool.isRequired,
	setIsShowIcon: PropTypes.func.isRequired
};

IconBar.defaultProps = {
	qrCodeName: null
};

IconBar.propTypes = {
	isShowIcon: PropTypes.bool.isRequired,
	qrCodeName: PropTypes.string,
	showQRcode: PropTypes.func.isRequired,
	onMouseLeaveIconBar: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
};

export default QuickdownloadLink;
