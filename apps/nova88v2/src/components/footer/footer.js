import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import TandC from "../../service/t_and_c";
// import Responsibility1 from "../../styles/img/responsibility1.png";
// import Responsibility2 from "../../styles/img/responsibility2.png";
import Licenses from "../../styles/img/licenses.png";
// import Security from "../../styles/img/security.png";
// import {
// 	defSportsBetting_Section1,
// 	defSportsBetting_Section2
// } from "./footer.def";
import LinkItems from "../common/linkItems";
import { userInfoContext } from "../common/context";
import config, { SiteInfo } from "../../config";
import PlatformSection from "./footer.platform";
import FooterListSection from "./footer.list";

const openLiveChat = () => {
	window.LiveChatWidget.call("maximize");
};

const CopyrightSection = ({ t, langId }) => (
	<div className="copyright">
		<a href={TandC(langId).AboutUs} target="_blank" rel="noreferrer">
			{t("lbl_AboutUs")}
		</a>
		<a onClick={openLiveChat}>{t("lbl_LiveChat")}</a>
		<a href={TandC(langId).ContactUs} target="_blank" rel="noreferrer">
			{t("lbl_ContactUs")}
		</a>
		<a href={TandC(langId).Terms} target="_blank" rel="noreferrer">
			{t("lbl_TermsConditions")}
		</a>
		<a
			style={{ fontWeight: "bold" }}
			href={`${SiteInfo.affiliateLink}/?lang=${langId}`}
			target="_blank"
			rel="noreferrer">
			{t("lbl_Affiliates")}
		</a>
		<span>{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved.`}</span>
	</div>
);

const LicensesSection = ({ t }) => (
	<div className="license">
		<div>
			<div className="title">{t("lbl_Gaming_License")}</div>
			<img src={Licenses} />
			{t("lbl_Gaming_License_desc")}
		</div>
		<div>
			<iframe
				width="256"
				height="140"
				src="https://www.youtube.com/embed/Cn74XFuYAcE"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div>
				<div>{t("lbl_JOE_COLE")}</div>
				{/* <img
					src={require(`../../styles/img/joecole_w.png`)}
					alt="joecole_w"
				/> */}
				<div>{t("lbl_Brand_Ambassador")}</div>
				<div>{t("lbl_Former_Chelsea_Liverpool")}</div>
				<div>{t("lbl_England_International")}</div>
			</div>
			<img
				className="star"
				src={require(`../../styles/img/jc.png`)}
				alt="joecole"
			/>
		</div>
	</div>
);

const PromoteSection = ({ t }) => (
	<div className="sfp">
		<div>
			<div className="title">{t("lbl_SocialMedia")}</div>
			<div>
				<a href="">
					<img src={require(`../../styles/img/fb.png`)} alt="fb" />
				</a>
				<a href="">
					<img src={require(`../../styles/img/in.png`)} alt="in" />
				</a>
				<a href="">
					<img src={require(`../../styles/img/tw.png`)} alt="tw" />
				</a>
				<a href="">
					<img src={require(`../../styles/img/yt.png`)} alt="yt" />
				</a>
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_Follow_Us")}</div>
			<div>
				<a href="">
					<img
						src={require(`../../styles/img/gg.png`)}
						alt="chrome"
					/>
				</a>
				<a href="">
					<img
						src={require(`../../styles/img/ff.png`)}
						alt="FireFox"
					/>
				</a>
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_PaymentMethods")}</div>
			<div>
				<button>
					<img src={`${config.imgUrl}/common/images/logo/h2p.png`} />
				</button>
				<button>
					<img src={`${config.imgUrl}/common/images/logo/ep.png`} />
				</button>
			</div>
		</div>
	</div>
);

export default ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<footer id="footer">
			<CopyrightSection t={t} langId={userInfo.langId} />
			<PlatformSection
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				productTpIds={productTpIds}
			/>
			<FooterListSection t={t} langId={userInfo.langId} />
			<LicensesSection t={t} />
			<PromoteSection t={t} />
		</footer>
	);
};
