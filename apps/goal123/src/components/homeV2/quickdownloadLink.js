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

	return (
		<div
			onFocus={() => 0}
			onMouseOver={() => setActive(true)}
			onMouseLeave={() => setActive(false)}
			className={`quickdownload${active ? " active" : ""}`}
			style={{ zIndex: active ? higherToTheAngpowZIndex : orignZIndex }}>
			<div onClick={async () => setActive(false)}>
				<button className="icon icon-mobile" />

				<i
					className={
						active
							? "icon icon-cancel-circle"
							: "icon icon-circle-right"
					}>
					{t("lbl_Download").toUpperCase()}
				</i>
			</div>

			<div>
				<ul>
					<li>
						<a
							href="https://mars.fadatsai88.com/v1/App?path=goal123entry_sports_android.apk"
							target="_blank"
							rel="noreferrer">
							<img src={androidIconImg} alt="" />
							Android
						</a>
						<img src={androidQRcodeImg} alt="android_qr" />
					</li>
					<li>
						<a
							href="https://www.aso008.com/aeFHM7"
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
