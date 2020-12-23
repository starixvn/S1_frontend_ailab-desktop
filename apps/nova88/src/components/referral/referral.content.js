import React from "react";
import QRCode from "qrcode.react";

export default () => {
	let link_default = "https://www.nova88.net/";
	let ref_code = "Mayo888";
	let ref_link = `https://www.nova88.net/?refid=${ref_code}`;

	let text_welCome = "nova888 is my88 !! Nova88 讚哦~ ";

	let ref_fb = `https://www.facebook.com/sharer/sharer.php?u=${link_default}&quote=${text_welCome}`;
	let ref_telegram = `https://t.me/share/url?url=${link_default}&text=${text_welCome}`;
	let ref_skype = `https://web.skype.com/share?url=${link_default}&text=${text_welCome}`;
	let ref_whatsapp = `https://wa.me/?text=${text_welCome}`;

	return (
		<div className="referralModule">
			<div className="refShare">
				<div className="title">
					Share your favorite offers with friend!
				</div>
				<div className="refBox">
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
					<div>
						<div>
							FREE <span>MYR 88</span>
						</div>
						<div>
							Turn <span>8x</span>
						</div>
						<div>
							Deposit <span>888</span>
						</div>
						<a>More Details</a>
					</div>
				</div>
			</div>
			<div className="refLink">
				<div className="title">Your unique link invite</div>
				<div className="refBox">
					<div>
						Referral Code: <span>{ref_code}</span>
						<button className="icon icon-files-empty"></button>
					</div>
					<div>
						Referral Link: <span>{ref_link}</span>
						<button className="icon icon-files-empty"></button>
					</div>
					<div>
						<a className="icon icon-files-empty">
							Copy to Clipboard
						</a>
						<a className="icon icon-download2">Download</a>
						<a className="icon icon-facebook2" href={ref_fb}>
							Facebook
						</a>
						<a className="icon icon-telegram" href={ref_telegram}>
							Telegram
						</a>
						<a className="icon icon-whatsapp" href={ref_whatsapp}>
							Whatsapp
						</a>
						<a className="icon icon-skype" href={ref_skype}>
							Skype
						</a>
					</div>
					<QRCode value={ref_link} />
				</div>
			</div>
		</div>
	);
};
