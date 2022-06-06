import React from "react";
import PropTypes from "prop-types";

const FeaturePanel = ({ langId, t }) => {
	if (langId === "en") return <EN t={t} />;
	if (langId === "cs") return <CS t={t} />;
	if (langId === "my") return <MY t={t} />;
	if (langId === "th_en") return <THEN t={t} />;
	if (langId === "th") return <TH t={t} />;
	if (langId === "id_en") return <IDEN t={t} />;
	if (langId === "id") return <ID t={t} />;
	if (langId === "hi_en") return <HIEN t={t} />;
	if (langId === "hi") return <HI t={t} />;
	return <EN />;
};

FeaturePanel.propTypes = {
	langId: PropTypes.string.isRequired
};

export default FeaturePanel;

const EN = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			FEATURES
		</div>
		<div className="title">MEMBER BENEFITS</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">ENJOY NOVA88 VIP EXCLUSIVE BONUS & REBATES</div>
		<ul>
			<li>
				Multiple product platforms with better odds and full gameplay
				experience.
			</li>
			<li>Speedy deposit and withdrawal with multiple deposit option.</li>
		</ul>
	</div>
);

const CS = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			特征
		</div>
		<div className="title">会员福利</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">豪享NOVA88尊贵优惠红利与返水</div>
		<ul>
			<li>多样化产品平台配上超划赔率以及完整游戏体验。</li>
			<li>多项支付方式且火速存/提款交易。</li>
		</ul>
	</div>
);

const MY = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			CIRI-CIRI
		</div>
		<div className="title">KELEBIHAN MENJADI AHLI</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">
			NIKMATI BONUS & REBAT EKSKLUSIF AHLI VIP NOVA88
		</div>
		<ul>
			<li>
				Produk platform yang berbilang dengan peluang kemenangan yang
				lebih baik dan pengalaman permainan menyeluruh.
			</li>
			<li>
				Proses deposit dan pengeluaran yang pantas dengan pelbagai
				pilihan deposit.
			</li>
		</ul>
	</div>
);

const THEN = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			FEATURES
		</div>
		<div className="title">MEMBER BENEFITS</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">ENJOY NOVA88 VIP EXCLUSIVE BONUS & REBATES</div>
		<ul>
			<li>
				Multiple product platforms with better odds and full gameplay
				experience.
			</li>
			<li>Speedy deposit and withdrawal with multiple deposit option.</li>
		</ul>
	</div>
);

const TH = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			คุณสมบัติ
		</div>
		<div className="title">สิทธิประโยชน์ของสมาชิก</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">เพลิดเพลินไปกับ NOVA88 โบนัสและเงินคืนพิเศษ</div>
		<ul>
			<li>
				แพลตฟอร์มเกมที่หลากหลายพร้อมโอกาสที่ดีกว่าและประสบการณ์การเล่นเกมเต็มรูปแบบ
			</li>
			<li>ฝากและถอนอย่างรวดเร็วด้วยตัวเลือกการฝากที่หลากหลาย</li>
		</ul>
	</div>
);

const IDEN = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			FEATURES
		</div>
		<div className="title">MEMBER BENEFITS</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">ENJOY NOVA88 VIP EXCLUSIVE BONUS & REBATES</div>
		<ul>
			<li>
				Multiple product platforms with better odds and full gameplay
				experience.
			</li>
			<li>Speedy deposit and withdrawal with multiple deposit option.</li>
		</ul>
	</div>
);

const ID = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			FITUR
		</div>
		<div className="title">MANFAAT MEMBER</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">NIKMATI BONUS & REBATE EKSKLUSIF NOVA88 VIP</div>
		<ul>
			<li>
				Berbagai produk dengan odds terbaik dan sensasi permainan yang
				lengkap.
			</li>
			<li>Deposit dan penarikan cepat dengan berbagai pilihan.</li>
		</ul>
	</div>
);

const HIEN = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			FEATURES
		</div>
		<div className="title">MEMBER BENEFITS</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">ENJOY NOVA88 VIP EXCLUSIVE BONUS & REBATES</div>
		<ul>
			<li>
				Multiple product platforms with better odds and full gameplay
				experience.
			</li>
			<li>Speedy deposit and withdrawal with multiple deposit option.</li>
		</ul>
	</div>
);

const HI = ({ t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			विशेषताएं
		</div>
		<div className="title">सदस्यों के लाभ</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>{t("lbl_MemberBenefits_4")}</li>
		</ul>
		<div className="title">NOVA88 वीआईपी विशेष बोनस और छूट का आनंद लें</div>
		<ul>
			<li>
				बेहतर ऑड्स और पूर्ण गेमप्ले अनुभव के साथ कई उत्पाद प्लेटफॉर्म।
			</li>
			<li>कई जमा विकल्पों के साथ शीघ्र जमा और निकासी।</li>
		</ul>
	</div>
);
