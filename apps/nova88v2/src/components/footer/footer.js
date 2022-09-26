import React, { useContext, useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import TandC from "../../service/t_and_c";
import { userInfoContext, popBoxContext } from "../common/context";
import { SiteInfo, bannerImgUrl } from "../../config";
import PlatformSection from "./footer.platform";
import ProductSection from "./footer.product";
import FollowUsSection from "./footer.followUs";
import { defFooterProductList } from "./footer.def";
import path from "../../router";
import defPopBoxType from "../common/defPopBoxType";
import { api_site_GetTpIds } from "../../service/api/site";
import { currencyCode } from "../../datas/countryCode";
import usePopBox from "../hook/usePopBox";
import { useGetSEODatas } from "../seo/seo";

const Footer = ({ isFullFooter = false }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
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
			api_site_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setProductTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
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

	let _langId = userInfo?.defaultLang;
	if (userInfo.langId) {
		_langId = userInfo.langId;
	}

	return (
		<footer id="footer">
			<CopyrightSection t={t} langId={_langId} />
			{isFullFooter && (
				<PlatformSection
					t={t}
					isLogin={userInfo.isLogin}
					langId={userInfo.langId}
					currencyId={userInfo.currencyId}
					productTpIds={productTpIds}
				/>
			)}
			<ProductSection
				t={t}
				langId={userInfo.langId}
				currencyId={userInfo.currencyId}
				currencyCode={currencyCode}
				defFooterProductList={defFooterProductList}
				path={path}
				SiteInfo={SiteInfo}
				linkToReferral={linkToReferral}
				openLiveChat={openLiveChat}
				isFullFooter={isFullFooter}
			/>
			<LicensesSection t={t} errorPopBox={errorPopBox} />
			<FollowUsSection
				t={t}
				langId={_langId}
				currencyId={userInfo.currencyId ?? null}
			/>
		</footer>
	);
};

Footer.defaultProps = {
	isFullFooter: undefined
};

Footer.propTypes = {
	isFullFooter: PropTypes.bool
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
		<span>{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved. 18+`}</span>
	</div>
);

CopyrightSection.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};

const defaultScript = "a7019fa5-9f9a-468b-92da-4890f6a6e4a7";
const defaultXCMScript = "226e4de2-30aa-4077-951b-d440012994f3";

export const LicensesSection = ({ t, errorPopBox }) => {
	const { SEODatas } = useGetSEODatas({ getFromAPI: true, errorPopBox });
	const showLicenseLogo = SEODatas?.activeDomain ?? false;

	const CuracaoScript = SEODatas?.script ?? defaultScript;
	const formattedCuracaoScript = CuracaoScript?.replaceAll("-", "_");

	const XCMScript = SEODatas?.xcmScript ?? defaultXCMScript;
	const formattedXCMScript = XCMScript?.replaceAll("-", "_");

	useEffect(() => {
		try {
			if (showLicenseLogo) {
				// apg_a7019fa5_9f9a_468b_92da_4890f6a6e4a7.init();
				// xcm_226e4de2_30aa_4077_951b_d440012994f3.init();
				`apg_${formattedCuracaoScript}`.init();
				`xcm_${formattedXCMScript}`.init();
			}
		} catch (error) {}
	}, [showLicenseLogo]);

	return (
		<>
			<div className="license">
				<div>
					{showLicenseLogo && (
						<>
							<div className="title">
								{t("lbl_Gaming_License")}
								<img
									src={`${bannerImgUrl}/img/license_tick.png`}
									alt="vaild gaming license"
								/>
							</div>
							<div>
								{/* <div
								id="apg-a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
								data-apg-seal-id="a7019fa5-9f9a-468b-92da-4890f6a6e4a7"
								data-apg-image-size="128"
								data-apg-image-type="basic-small"
							/> */}
								{/* <div
								id="xcm-226e4de2-30aa-4077-951b-d440012994f3"
								data-xcm-seal-id="226e4de2-30aa-4077-951b-d440012994f3"
								data-xcm-image-size="128"
								data-xcm-image-type="basic-small"
							/> */}
								<div
									id={`apg-${CuracaoScript}`}
									data-apg-seal-id={CuracaoScript}
									data-apg-image-size="128"
									data-apg-image-type="basic-small"
								/>
								<div
									id={`xcm-${XCMScript}`}
									data-xcm-seal-id={XCMScript}
									data-xcm-image-size="128"
									data-xcm-image-type="basic-small"
								/>
							</div>
						</>
					)}
				</div>
				<div>
					<iframe
						width="256"
						height="140"
						src="https://www.youtube.com/embed/6EDFfaSZxrE"
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
					<div>
						<div>{t("lbl_JOE_COLE")}</div>
						<div>{t("lbl_Brand_Ambassador")}</div>
						<img
							src={`${bannerImgUrl}/desktop/img/joecole_w.png`}
							alt="joecole_signature"
						/>
						<div>{t("lbl_Former_Chelsea_Liverpool")}</div>
						<div>{t("lbl_England_International")}</div>
					</div>
					<img
						className="star"
						src={`${bannerImgUrl}/desktop/img/jc.png`}
						alt="joecole_photo"
					/>
				</div>
			</div>
			<LicenseHelmet script={CuracaoScript} xcmScript={XCMScript} />
		</>
	);
};

LicensesSection.defaultProps = {
	errorPopBox: () => null
};

LicensesSection.propTypes = {
	t: PropTypes.func.isRequired,
	errorPopBox: PropTypes.func
};

const LicenseHelmet = ({ script, xcmScript }) => (
	<Helmet>
		<script
			type="text/javascript"
			src={`https://${script}.snippet.antillephone.com/apg-seal.js`}
		/>
		<script
			type="text/javascript"
			src={`https://${xcmScript}.seals-xcm.certria.com/xcm-seal.js`}
		/>
	</Helmet>
);

LicenseHelmet.defaultProps = {
	script: null,
	xcmScript: null
};

LicenseHelmet.propTypes = {
	script: PropTypes.string,
	xcmScript: PropTypes.string
};

export default Footer;
