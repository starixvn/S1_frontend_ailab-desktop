import React, { useState } from "react";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import useAppDownLoad from "../appDownload/useAppDownLoad";

const QuickdownloadLink = ({ t }) => {
	const [active, setActive] = useState(false);
	const { appLinkDatas } = useAppDownLoad();

	const showQRcode = url => {
		if (typeof window !== undefined) window.open(url);
	};

	if (Object.keys(appLinkDatas).length === 0) return null;

	return (
		<>
			<DownloadBar
				t={t}
				className={active ? "active" : ""}
				onMouseOver={() => setActive(true)}
			/>
			<IconBar
				t={t}
				className={active ? "" : "active"}
				appLinkDatas={appLinkDatas}
				showQRcode={showQRcode}
				onMouseLeave={() => setActive(false)}
			/>
		</>
	);
};

export const DownloadBar = ({ t, className, onMouseOver }) => {
	return (
		<div
			className={`quickLinkNew3 ${className}`}
			onMouseOver={onMouseOver}
			onFocus={() => 0}>
			<i className="icon icon-arrow-right2" />
			<div>{t("lbl_Download")}</div>
		</div>
	);
};

export const IconBar = ({
	t,
	showQRcode,
	className,
	appLinkDatas,
	onMouseLeave
}) => {
	const andriodDownLoadUrl = appLinkDatas?.Andriod?.downloadLink ?? "";
	const IOSDownloadUrl = appLinkDatas?.IOS?.downloadLink ?? "";

	return (
		<div
			className={`quickLinkNew4 ${className}`}
			onMouseLeave={onMouseLeave}>
			<i className="icon icon-arrow-left2" />
			{IOSDownloadUrl && (
				<button
					className="icon icon-appleinc"
					onClick={() => showQRcode(IOSDownloadUrl)}>
					{t("lbl_iOS")?.toUpperCase()}
					<div>
						<QRCode
							value={IOSDownloadUrl}
							renderAs="svg"
							size={112}
							includeMargin={true}
						/>
					</div>
				</button>
			)}

			{andriodDownLoadUrl && (
				<button
					className="icon icon-android"
					onClick={() => showQRcode(andriodDownLoadUrl)}>
					{t("lbl_Android")?.toUpperCase()}
					<div>
						<QRCode
							value={andriodDownLoadUrl}
							renderAs="svg"
							size={112}
							includeMargin={true}
						/>
					</div>
				</button>
			)}
		</div>
	);
};

QuickdownloadLink.propTypes = {
	t: PropTypes.func.isRequired
};

DownloadBar.propTypes = {
	t: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	onMouseOver: PropTypes.func.isRequired
};

IconBar.propTypes = {
	t: PropTypes.func.isRequired,
	showQRcode: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	appLinkDatas: PropTypes.objectOf(PropTypes.any).isRequired,
	onMouseLeave: PropTypes.func.isRequired
};

export default QuickdownloadLink;
