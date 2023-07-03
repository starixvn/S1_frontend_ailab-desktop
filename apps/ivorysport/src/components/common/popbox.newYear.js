import React from "react";
import { bannerImgUrl } from "../../config";
import { setCookie } from "./common";

export const defEventPeriod = {
	startDate: "2022/1/31 12:00:00",
	endDate: "2022/02/08 12:00:00"
};

const defContent = {
	en: [
		"Gong Xi Fa Cai!",
		"IvorySport Wish You A Happy New Year!",
		"MYR 188,888.88",
		"Ang Pao Giving Away",
		"Be Calm & Keep Eye On Your Message Inbox!"
	],
	cs: [
		"恭喜发财！",
		"IvorySport 恭祝您新年快乐！",
		"马币 188,888.88",
		"红包随机派送",
		"淡定且随时检查您的个人收件箱！"
	],
	id_en: [
		"Gong Xi Fa Cai!",
		"IvorySport Wish You A Happy New Year!",
		"IDR 388,888,888",
		"Ang Pao Giving Away",
		"Be Calm & Keep Eye On Your Message Inbox!"
	],
	id: [
		"Gong Xi Fa Cai!",
		"IvorySport Selamat Tahun Baru Imlek!",
		"IDR 388,888,888",
		"Bagi-bagi Angpao",
		"Tunggu & Cek Kotak Pesan Anda!"
	],
	th_en: [
		"Gong Xi Fa Cai!",
		"IvorySport Wish You A Happy New Year!",
		"THB 888,888",
		"Ang Pao Giving Away",
		"Be Calm & Keep Eye On Your Message Inbox!"
	],
	th: [
		"กงสีฟาไฉ!",
		"IvorySport ขออวยพรให้สมาชิกทุกท่านมีความสุขในช่วงตรุษจีน!",
		"THB 888,888",
		"แจกอั่งเปา",
		"ใจเย็นๆและคอยเช็คกล่องข้อความ!"
	]
};

const Component = ({ setPopBox, langId }) => {
	const clickClose = () => {
		setCookie(`NewYear-${window.location.hostname}`, 1, 1);
		setPopBox(prev => ({ ...prev, isOpen: false }));
	};

	const rows = defContent[langId].map(text => (
		<div key={`cny-new-year-${text}`}>{text}</div>
	));

	return (
		<div className="pop angpaopop active">
			<button className="icon icon-close" onClick={clickClose} />
			<div className="angpao_txt">{rows}</div>
			<img
				className="door"
				src={`${bannerImgUrl}/desktop/img/angpaopop/door.png`}
				alt="new year popup"
			/>
			<img
				className="bottom_pic"
				src={`${bannerImgUrl}/desktop/img/angpaopop/bottom-pic.png`}
				alt="new year popup"
			/>
			<img
				className="cloud"
				src={`${bannerImgUrl}/desktop/img/angpaopop/cloud.png`}
				alt="new year popup"
			/>
			<img
				className="tiger"
				src={`${bannerImgUrl}/desktop/img/angpaopop/tiger.png`}
				alt="new year popup"
			/>
			<img
				className="left_light"
				src={`${bannerImgUrl}/desktop/img/angpaopop/left-light.png`}
				alt="new year popup"
			/>
			<img
				className="right_light"
				src={`${bannerImgUrl}/desktop/img/angpaopop/right-light.png`}
				alt="new year popup"
			/>
			<img
				className="fire1"
				src={`${bannerImgUrl}/desktop/img/angpaopop/fire.png`}
				alt="new year popup"
			/>
			<img
				className="fire2"
				src={`${bannerImgUrl}/desktop/img/angpaopop/fire.png`}
				alt="new year popup"
			/>
		</div>
	);
};

export default Component;
