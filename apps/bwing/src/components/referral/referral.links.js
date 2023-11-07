import React from "react";
import QRCode from "qrcode.react";

export default ({ referralCode, t, langId }) => {
	const link_default = window.location.origin;
	const ref_link = `${link_default}/${langId}/join?AffId=${referralCode}`;
	const welcomeMessage = t("lbl_Referral_Welcome_Bwing");
	const ref_telegram = `https://t.me/share/url?url=${link_default}&text=${welcomeMessage}`;
	const ref_fb = `https://www.facebook.com/sharer/sharer.php?u=${link_default}&quote=${welcomeMessage}`;
	const ref_line = `http://line.naver.jp/R/msg/text/?${welcomeMessage}%0D%0A${link_default}`;
	const ref_whatsapp = `https://wa.me/?&text=${welcomeMessage} ${link_default}`;

	const copyWelComeText = () => {
		const virtualInput = document.createElement("input");
		virtualInput.value = welcomeMessage;
		document.body.appendChild(virtualInput);
		virtualInput.select();
		document.execCommand("copy");
		document.body.removeChild(virtualInput);
	};

	const onCopy = column_id => {
		const copyColumn = document.getElementById(column_id);
		window.getSelection().selectAllChildren(copyColumn);
		document.execCommand("copy");
	};

	const downloadQR = () => {
		const canvas = document.getElementById(referralCode);
		const pngUrl = canvas
			.toDataURL("image/png")
			.replace("image/png", "image/octet-stream");
		const downloadLink = document.createElement("a");
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
				{/* <div style={{ display: "none" }}>
					<span id="ref_code">{referralCode}</span>
					<button
						className="icon icon-files-empty"
						onClick={onCopy.bind(this, "ref_code")}
					/>
				</div> */}
				<div>
					{t("lbl_Referral_link")} :{" "}
					<span id="ref_link">{ref_link}</span>{" "}
					<button
						className="icon icon-files-empty"
						onClick={onCopy.bind(this, "ref_link")}
					/>
				</div>

				<div className="Community">
					<a
						className="icon icon-files-empty"
						onClick={copyWelComeText}>
						{t("lbl_Copy_to_clipboard")}
					</a>
					<a className="icon icon-cloud_upload" onClick={downloadQR}>
						{t("lbl_Download")}
					</a>
					<a
						className="icon icon-facebook2"
						onClick={() =>
							window.open(ref_fb, "", "height=600,width=600")
						}>
						{t("lbl_Facebook")}
					</a>

					<a
						className="icon icon-telegram"
						onClick={() =>
							window.open(
								ref_telegram,
								"",
								"height=600,width=600"
							)
						}>
						{t("lbl_Telegram")}
					</a>

					<a
						className="icon icon-whatsapp"
						onClick={() =>
							window.open(
								ref_whatsapp,
								"",
								"height=600,width=600"
							)
						}>
						{t("lbl_WhatsApp")}
					</a>

					<a
						className="icon icon-line"
						onClick={() =>
							window.open(ref_line, "", "height=600,width=600")
						}>
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
