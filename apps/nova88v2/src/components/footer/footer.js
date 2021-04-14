import React, { useContext, useEffect, useState, useRef } from "react";
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
import { api_site_GetTpIds } from "../../service/api/site";
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

import ImgFB_Hover from "../../styles/img/fba.png";
import ImgIN_Hover from "../../styles/img/ina.png";
import ImgTW_Hover from "../../styles/img/twa.png";
import ImgYT_Hover from "../../styles/img/yta.png";
import ImgChrome_Hover from "../../styles/img/gga.png";
import ImgFireFox_Hover from "../../styles/img/ffa.png";
import ImgHP_Hover from "../../styles/img/hpa.png";
import ImgEZ_Hover from "../../styles/img/eza.png";

const fbName = "fb";
const inName = "in";
const twName = "tw";
const ytName = "yt";
const chromeName = "chrome";
const firefoxName = "firefox";
const hpName = "hp";
const ezName = "ez";

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
				<div>{t("lbl_Brand_Ambassador")}</div>
				<img src={ImgJoeColeSignature} alt="joecole_signature" />
				<div>{t("lbl_Former_Chelsea_Liverpool")}</div>
				<div>{t("lbl_England_International")}</div>
			</div>
			<img className="star" src={ImgJoeColePhoto} alt="joecole_photo" />
		</div>
	</div>
);

const FollowUsSection = ({ t, handleHoverImg, hoverNamme }) => (
	<div className="sfp">
		<div>
			<div className="title">{t("lbl_Follow_Us")}</div>
			<div>
				<a
					href={SiteInfo.socialMedia.fb.link}
					target="_blank"
					rel="noreferrer">
					<img
						src={hoverNamme === fbName ? ImgFB_Hover : ImgFB}
						alt={fbName}
						onMouseOver={handleHoverImg.bind(this, fbName)}
						onMouseOut={handleHoverImg.bind(this, null)}
						onBlur={() => 0}
						onFocus={() => 0}
					/>
				</a>
				<a
					href={SiteInfo.socialMedia.ig.link}
					target="_blank"
					rel="noreferrer">
					<img
						src={hoverNamme === inName ? ImgIN_Hover : ImgIN}
						alt={inName}
						onMouseOver={handleHoverImg.bind(this, inName)}
						onMouseOut={handleHoverImg.bind(this, null)}
						onBlur={() => 0}
						onFocus={() => 0}
					/>
				</a>
				<a
					href={SiteInfo.socialMedia.twitter.link}
					target="_blank"
					rel="noreferrer">
					<img
						src={hoverNamme === twName ? ImgTW_Hover : ImgTW}
						alt={twName}
						onMouseOver={handleHoverImg.bind(this, twName)}
						onMouseOut={handleHoverImg.bind(this, null)}
						onBlur={() => 0}
						onFocus={() => 0}
					/>
				</a>
				<a
					href={SiteInfo.socialMedia.youtube.link}
					target="_blank"
					rel="noreferrer">
					<img
						src={hoverNamme === ytName ? ImgYT_Hover : ImgYT}
						alt={ytName}
						onMouseOver={handleHoverImg.bind(this, ytName)}
						onMouseOut={handleHoverImg.bind(this, null)}
						onBlur={() => 0}
						onFocus={() => 0}
					/>
				</a>
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_Suggested_Browser")}</div>
			<div>
				<img
					src={
						hoverNamme === chromeName ? ImgChrome_Hover : ImgChrome
					}
					alt={chromeName}
					onMouseOver={handleHoverImg.bind(this, chromeName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
				<img
					src={
						hoverNamme === firefoxName
							? ImgFireFox_Hover
							: ImgFireFox
					}
					alt={firefoxName}
					onMouseOver={handleHoverImg.bind(this, firefoxName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
			</div>
		</div>
		<div>
			<div className="title">{t("lbl_Payment_Method")}</div>
			<div>
				<img
					src={hoverNamme === hpName ? ImgHP_Hover : ImgHP}
					alt={hpName}
					onMouseOver={handleHoverImg.bind(this, hpName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
				<img
					src={hoverNamme === ezName ? ImgEZ_Hover : ImgEZ}
					alt={ezName}
					onMouseOver={handleHoverImg.bind(this, ezName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
			</div>
		</div>
	</div>
);

export const Footer = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [productTpIds, setProductTpIds] = useState(null);
	const isMountedRef = useRef(null);
	const [hoverNamme, setHoverNamme] = useState(null);

	const handleHoverImg = _hoverName => {
		setHoverNamme(_hoverName);
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin && productTpIds === null) {
			api_site_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setProductTpIds(res.data.data);
				}
			});
		} else if (userInfo.isLogin === false && productTpIds?.length > 0) {
			setProductTpIds(null);
		}
	}, [userInfo.isLogin, productTpIds]);

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
			<FollowUsSection
				t={t}
				handleHoverImg={handleHoverImg}
				hoverNamme={hoverNamme}
			/>
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

FollowUsSection.defaultProps = {
	hoverNamme: null
};

FollowUsSection.propTypes = {
	t: PropTypes.func.isRequired,
	hoverNamme: PropTypes.string,
	handleHoverImg: PropTypes.func.isRequired
};

export default Footer;
