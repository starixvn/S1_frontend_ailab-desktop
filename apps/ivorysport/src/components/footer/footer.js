import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import { api_site_GetTpIds } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";

const Footer = ({ isFullFooter = false }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

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

	let _langId = userInfo?.defaultLang;
	if (userInfo.langId) {
		_langId = userInfo.langId;
	}

	return (
		<footer id="footer">
			<CopyrightSection
				t={t}
				langId={_langId}
				currencyId={userInfo.currencyId}
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

export const CopyrightSection = ({ t }) => {
	// 暫時都只有en
	return (
		<div className="copyright">
			<a
				// href={`${bannerImgUrl}/Static/${getCombineLangId(
				// 	langId,
				// 	currencyId
				// )}/AboutUs.html`}
				href={`${bannerImgUrl}/Static/en/AboutUs.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_AboutUs")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/ContactUs.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_ContactUs")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/FAQ.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_FAQ")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/AccountTerms.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_AccountTerms")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/RulesandRegulations.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_RuleRegulations")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/TermsConditions.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_TermsConditions")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/Terms.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_Terms")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/PrivacyPolicy.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_PrivacyPolicy")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/en/ResposibleGaming.html`}
				target="_blank"
				rel="noreferrer"
			>
				{t("lbl_ResposibleGaming")}
			</a>

			<div className="footer-center">
				<div className="footer-center-item">
					<div className="footer-center-title">
						{t("lbl_GamingLicense")}
					</div>
					<a
						href="https://www.pagcor.ph/regulatory/cop.php"
						target="_blank"
						className="game-license"
						rel="noreferrer"
					>
						<img
							src={`${bannerImgUrl}/desktop/img/pagcor.png`}
							alt=""
						/>
					</a>
				</div>
				<div className="footer-center-item">
					<div className="footer-center-title">
						{t("lbl_SuggestedBrowser")}
					</div>
					<div className="footer-icon">
						<img
							src={`${bannerImgUrl}/desktop/img/edge.png`}
							alt=""
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/chrome.png`}
							alt=""
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/safari.png`}
							alt=""
						/>
						<img
							src={`${bannerImgUrl}/desktop/img/firefox.png`}
							alt=""
						/>
					</div>
				</div>
				<div className="footer-center-item payment">
					<div className="footer-center-title">
						{t("lbl_PaymentMethods")}
					</div>
					<div className="footer-icon">
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/maybank.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/ocbc.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/ambank.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/cimb.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/rhb.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/affin.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/hlb.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/pbb.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/duitnow.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/tng.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/boost.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/grabpay.jpg`}
								alt=""
							/>
						</a>
						<a href="">
							<img
								src={`${bannerImgUrl}/desktop/img/footer/square/shopeepay.jpg`}
								alt=""
							/>
						</a>
					</div>
				</div>
			</div>

			<span>{`© Copyright ${new Date().getFullYear()}. DYNAMIC SYSTEM INTERNATIONAL LIMITED. All Rights Reserved. 21+`}</span>
			<span>Email: support247@ivorysport.com</span>
		</div>
	);
};

CopyrightSection.propTypes = {
	t: PropTypes.func.isRequired
};

export default Footer;
