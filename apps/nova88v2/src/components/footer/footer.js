import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import TandC from "../../service/t_and_c";
import { userInfoContext, popBoxContext } from "../common/context";
import { SiteInfo } from "../../config";
import PlatformSection from "./footer.platform";
import ProductSection from "./footer.product";
import { defFooterProductList } from "./footer.def";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";

import ImgLicense from "../../styles/img/licenses.png";
import ImgJoeColeSignature from "../../styles/img/joecole_w.png";
import ImgJoeColePhoto from "../../styles/img/jc.png";
import ImgFB from "../../styles/img/fb.png";
import ImgIN from "../../styles/img/in.png";
import ImgTW from "../../styles/img/tw.png";
import ImgYT from "../../styles/img/yt.png";
import ImgChrome from "../../styles/img/gg.png";
import ImgFireFox from "../../styles/img/ff.png";
import ImgHP from "../../styles/img/hp.png";
import ImgEZ from "../../styles/img/ez.png";

const CopyrightSection = ({ t, langId }) => (
	<div className="copyright">
		<a href={TandC(langId).AboutUs} target="_blank" rel="noreferrer">
			{t("lbl_AboutUs")}
		</a>
		<a href={TandC(langId).ContactUs} target="_blank" rel="noreferrer">
			{t("lbl_ContactUs")}
		</a>
		<a href={TandC(langId).Terms} target="_blank" rel="noreferrer">
			{t("lbl_TermsConditions")}
		</a>
		<span>{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved. 21+`}</span>
	</div>
);

const LicensesSection = ({ t }) => (
	<div className="license">
		<div>
			<div className="title">{t("lbl_Gaming_License")}</div>
			<img src={ImgLicense} alt="footer-license" />
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
				<div>NOVA88 {t("lbl_Brand_Ambassador")}</div>
				<img src={ImgJoeColeSignature} alt="joecole_signature" />
				<div>{t("lbl_Former_Chelsea_Liverpool")}</div>
				<div>{t("lbl_England_International")}</div>
			</div>
			<img className="star" src={ImgJoeColePhoto} alt="joecole_photo" />
		</div>
	</div>
);

const FollowUsSection = ({ t }) => (
	<div className="sfp">
		<div>
			<div className="title">{t("lbl_Follow_Us")}</div>
			<div>
				<a
					href={SiteInfo.socialMedia.fb.link}
					target="_blank"
					rel="noreferrer">
					<img src={ImgFB} alt="fb" />
				</a>
				<a
					href={SiteInfo.socialMedia.ig.link}
					target="_blank"
					rel="noreferrer">
					<img src={ImgIN} alt="in" />
				</a>
				<a
					href={SiteInfo.socialMedia.twitter.link}
					target="_blank"
					rel="noreferrer">
					<img src={ImgTW} alt="tw" />
				</a>
				<a
					href={SiteInfo.socialMedia.youtube.link}
					target="_blank"
					rel="noreferrer">
					<img src={ImgYT} alt="yt" />
				</a>
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_Suggested_Browser")}</div>
			<div>
				<img src={ImgChrome} alt="chrome" />
				<img src={ImgFireFox} alt="FireFox" />
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_Payment_Method")}</div>
			<div>
				<img src={ImgHP} alt="payment-h2p" />
				<img src={ImgEZ} alt="payment-ep" />
			</div>
		</div>
	</div>
);

export const Footer = ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const openLiveChat = () => {
		window.LiveChatWidget.call("maximize");
	};

	const linkToReferral = () => {
		userInfo.isLogin
			? navigate(`/${userInfo.langId}/${path.referral.root}`)
			: setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Login
			  });
	};

	return (
		<footer id="footer">
			<CopyrightSection t={t} langId={userInfo.langId} />
			<PlatformSection
				t={t}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				productTpIds={productTpIds}
			/>
			<ProductSection
				t={t}
				defFooterProductList={defFooterProductList}
				path={path}
				SiteInfo={SiteInfo}
				langId={userInfo.langId}
				linkToReferral={linkToReferral}
				openLiveChat={openLiveChat}
			/>
			<LicensesSection t={t} />
			<FollowUsSection t={t} />
		</footer>
	);
};

CopyrightSection.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

LicensesSection.propTypes = {
	t: PropTypes.func.isRequired
};

FollowUsSection.propTypes = {
	t: PropTypes.func.isRequired
};

Footer.defaultProps = {
	productTpIds: null
};

Footer.propTypes = {
	productTpIds: PropTypes.arrayOf(PropTypes.any)
};

export default Footer;
