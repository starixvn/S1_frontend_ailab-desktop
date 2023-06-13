import React, { useContext, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";
import { api_site_GetTpIds } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";
import { getCombineLangId } from "../common/common";

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

export const CopyrightSection = ({ t, langId, currencyId }) => {
	return (
		<div className="copyright">
			<a
				href={`${bannerImgUrl}/Static/${getCombineLangId(
					langId,
					currencyId
				)}/AboutUs.html`}
				target="_blank"
				rel="noreferrer">
				{t("lbl_AboutUs")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/${getCombineLangId(
					langId,
					currencyId
				)}/ContactUs.html`}
				target="_blank"
				rel="noreferrer">
				{t("lbl_ContactUs")}
			</a>
			<a
				href={`${bannerImgUrl}/Static/${getCombineLangId(
					langId,
					currencyId
				)}/Terms.html`}
				target="_blank"
				rel="noreferrer">
				{t("lbl_TermsConditions")}
			</a>
			<span>{`© Copyright ${new Date().getFullYear()}. ivorysport. All Rights Reserved. 18+`}</span>
		</div>
	);
};

CopyrightSection.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number.isRequired
};

export default Footer;
