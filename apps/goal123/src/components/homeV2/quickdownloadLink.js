import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import androidIconImg from "../../styles/img/android.svg";
import androidQRcodeImg from "../../styles/img/android_qr.png";

import iosIconImg from "../../styles/img/ios.svg";
import iosQRcodeImg from "../../styles/img/ios_qr.png";

const higherToTheAngpowZIndex = 3;
const orignZIndex = 2;

const QuickdownloadLink = () => {
	const { t } = useTranslation();
	const [active, setActive] = useState(false);

	const activeToggleHandler = () => {
		setActive(prev => !prev);
	};

	return (
		<div
			className={`quickdownload${active ? " active" : ""}`}
			style={{ zIndex: active ? higherToTheAngpowZIndex : orignZIndex }}>
			<div>
				<button className="icon icon-mobile" />

				<i
					className="icon icon-circle-right"
					onClick={activeToggleHandler}>
					{t("lbl_Download").toUpperCase()}
				</i>
			</div>
			<div>
				<ul>
					<li>
						<a
							href="https://s3-ap-northeast-1.amazonaws.com/grd.fileshare/sasa/goal123/android/prodRelease-1.0.8-20201230-1804.apk"
							target="_blank"
							rel="noreferrer">
							<img src={androidIconImg} alt="" />
							Android
						</a>
						<img src={androidQRcodeImg} alt="android_qr" />
					</li>
					<li>
						<a
							href="https://appdage.com/76B5E24D6EC46B4B"
							target="_blank"
							rel="noreferrer">
							<img src={iosIconImg} alt="iosIcon" />
							iOS
						</a>

						<img src={iosQRcodeImg} alt="ios_qr" />
					</li>
				</ul>
			</div>
		</div>
	);
};

export default QuickdownloadLink;
