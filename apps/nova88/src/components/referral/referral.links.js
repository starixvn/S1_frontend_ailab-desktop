import React from "react";
import QRCode from "qrcode.react";

export default ({ referralCode, t }) => {
	const link_default = window.location.origin;
	const ref_link = `${link_default}?AffId=${referralCode}`;
	const welcomeMessage = t("lbl_Referral_Welcome");

	const ref_fb = `https://www.facebook.com/sharer/sharer.php?u=${link_default}&quote=${welcomeMessage}`;
	const ref_telegram = `https://t.me/share/url?url=${link_default}&text=${welcomeMessage}`;
	const ref_line = `http://line.naver.jp/R/msg/text/?${welcomeMessage}%0D%0A${link_default}`;
	const ref_whatsapp = `https://wa.me/?&text=${welcomeMessage}`;

	const copyWelComeText = () => {
		let virtualInput = document.createElement("input");
		virtualInput.value = welcomeMessage;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);
	};

	const onCopy = column_id => {
		let copyColumn = document.getElementById(column_id);
		window.getSelection().selectAllChildren(copyColumn);
		document.execCommand("copy");
	};

	const downloadQR = () => {
		const canvas = document.getElementById(referralCode);
		const pngUrl = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = `${referralCode}.png`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	return (
		<div className="refLink">
			<div className="title">{t("lbl_Your_link_invite")}</div>

			<div className="refBox">
				<div style={{ display: "none" }}>
					<span id="ref_code">{referralCode}</span>
					<button
						className="icon icon-files-empty"
						onClick={onCopy.bind(this, "ref_code")}></button>
				</div>
				<div>
					{t("lbl_Referral_link")} :{" "}
					<span id="ref_link">{ref_link}</span>
					<button
						className="icon icon-files-empty"
						onClick={onCopy.bind(this, "ref_link")}></button>
				</div>

				<div>
					<a
						className="icon icon-files-empty"
						onClick={copyWelComeText}>
						{t("lbl_Copy_to_clipboard")}
					</a>

					<a className="icon icon-download2" onClick={downloadQR}>
						{t("lbl_Download")}
					</a>

					<a className="icon icon-facebook2" href={ref_fb}>
						{t("lbl_Facebook")}
					</a>

					<a className="icon icon-telegram" href={ref_telegram}>
						{t("lbl_Telegram")}
					</a>

					<a className="icon icon-whatsapp" href={ref_whatsapp}>
						{t("lbl_WhatsApp")}
					</a>

					<a className="icon icon-line" href={ref_line}>
						{t("lbl_LINE")}
					</a>
				</div>
				<QRCode
					style={{ display: "none" }}
					id={referralCode}
					value={ref_link}
				/>
			</div>
		</div>
	);
};
