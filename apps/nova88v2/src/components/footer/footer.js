import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import TandC from "../../service/t_and_c";
import { userInfoContext, popBoxContext } from "../common/context";
import { SiteInfo } from "../../config";
import PlatformSection from "./footer.platform";
import ProductSection from "./footer.product";
import FollowUsSection from "./footer.followUs";
import { defFooterProductList } from "./footer.def";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";
import { api_site_GetTpIds } from "../../service/api/site";
// import ImgLicense from "../../styles/img/licenses.png";
import ImgJoeColeSignature from "../../styles/img/joecole_w.png";
import ImgJoeColePhoto from "../../styles/img/jc.png";
import { currencyCode } from "../../datas/countryCode";
import { useGetSEODatas } from "../seo/seo";

const Footer = ({ isFullFooter = false }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [productTpIds, setProductTpIds] = useState(null);
	const isMountedRef = useRef(null);

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
			{isFullFooter && (
				<PlatformSection
					t={t}
					isLogin={userInfo.isLogin}
					langId={userInfo.langId}
					currencyId={userInfo.currencyId ?? null}
					currencyCode={currencyCode}
					productTpIds={productTpIds}
				/>
			)}
			<ProductSection
				t={t}
				langId={userInfo.langId}
				currencyId={userInfo.currencyId ?? null}
				currencyCode={currencyCode}
				defFooterProductList={defFooterProductList}
				path={path}
				SiteInfo={SiteInfo}
				linkToReferral={linkToReferral}
				openLiveChat={openLiveChat}
				isFullFooter={isFullFooter}
			/>
			<LicensesSection t={t} />
			<FollowUsSection
				t={t}
				langId={userInfo.langId}
				currencyId={userInfo.currencyId ?? null}
				SiteInfo={SiteInfo}
			/>
		</footer>
	);
};

export const CopyrightSection = ({ t, langId }) => (
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

export const LicensesSection = ({ t }) => {
	const { SEODatas } = useGetSEODatas({ getFromAPI: true });
	const showLicenseLogo = SEODatas?.activeDomain ?? false;

	useEffect(() => {
		try {
			if (showLicenseLogo) {
				apg_a7019fa5_9f9a_468b_92da_4890f6a6e4a7.init();
			}
		} catch (error) {
			console.log(error);
		}
	}, [showLicenseLogo]);

	return (
		<div className="license">
			<div>
				{showLicenseLogo ? (
					<>
						<div className="title">{t("lbl_Gaming_License")}</div>
						<div
							id="apg-a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
							data-apg-seal-id="a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
							data-apg-image-size="128"
							data-apg-image-type="basic-small"
						/>
					</>
				) : null}
			</div>
			<div>
				<iframe
					width="256"
					height="140"
					src="https://www.youtube.com/embed/OpXnKKW1y20"
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
				<img
					className="star"
					src={ImgJoeColePhoto}
					alt="joecole_photo"
				/>
			</div>
		</div>
	);
};

Footer.defaultProps = {
	isFullFooter: undefined
};

Footer.propTypes = {
	isFullFooter: PropTypes.bool
};

CopyrightSection.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

LicensesSection.propTypes = {
	t: PropTypes.func.isRequired
};

export default Footer;
