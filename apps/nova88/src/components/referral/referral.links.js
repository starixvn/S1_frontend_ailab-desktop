import React, { useState } from "react";
import QRCode from "qrcode.react";

export default ({ myRef, t }) => {
	let link_default = window.location.origin;
	let ref_link = `${link_default}?AffId=${myRef}`;

	let text_welCome = "nova888 is my88 !! Nova88 讚哦~ ";

	let ref_fb = `https://www.facebook.com/sharer/sharer.php?u=${link_default}&quote=${text_welCome}`;
	let ref_telegram = `https://t.me/share/url?url=${link_default}&text=${text_welCome}`;
	let ref_line = `http://line.naver.jp/R/msg/text/?${text_welCome}%0D%0A${link_default}`;
	let ref_whatsapp = `https://wa.me/?&text=${text_welCome}`;

	const copyWelComeText = () => {
		let virtualInput = document.createElement("input");
		virtualInput.value = t("lbl_Referral_Welcome");
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

	console.log("myRef::", myRef);

	const downloadQR = () => {
		const canvas = document.getElementById("refImage");
		const pngUrl = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		let downloadLink = document.createElement("a");
		downloadLink.href = pngUrl;
		downloadLink.download = "refImage.png";
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};
	return (
		<div className="referralModule">
			<div className="refLink">
				<div className="title">{t("lbl_Your_link_invite")}</div>
				<div className="refBox">
					<div>
						{t("lbl_Referral_code")} :{" "}
						<span id="ref_code">{myRef}</span>
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
					<QRCode id="refImage" value={ref_link} />
				</div>
			</div>
		</div>
	);
};
