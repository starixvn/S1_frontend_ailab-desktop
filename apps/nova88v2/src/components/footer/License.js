import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { useGetSEODatas } from "../seo/seo";

const defaultScript = "a7019fa5-9f9a-468b-92da-4890f6a6e4a7";
const defaultXCMScript = "226e4de2-30aa-4077-951b-d440012994f3";

const License = () => {
	const { t } = useTranslation();
	const { SEODatas } = useGetSEODatas();
	const showLicenseLogo = SEODatas?.activeDomain ?? false;
	const CuracaoScript = SEODatas?.script ?? defaultScript;
	const formattedCuracaoScript = CuracaoScript?.split("-").join("_");

	const XCMScript = SEODatas?.xcmScript ?? defaultXCMScript;
	const formattedXCMScript = XCMScript?.split("-").join("_");

	useEffect(() => {
		if (showLicenseLogo) {
			const apgScript = window[`apg_${formattedCuracaoScript}`];
			const xcmScript = window[`xcm_${formattedXCMScript}`];
			apgScript?.init();
			xcmScript?.init();
		}
	}, [showLicenseLogo]);

	return (
		<div className="footer-center-item">
			<div className="footer-center-title">{t("lbl_Gaming_License")}</div>
			<div className="game-license">
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
				<div className="icon-aware">
					<a
						href="https://www.begambleaware.org/"
						target="_blank"
						rel="noreferrer"
					>
						<img
							src="https://banner.0814media.net/desktop/img/aware.png"
							alt=""
						/>
					</a>
				</div>
			</div>
			<LicenseHelmet script={CuracaoScript} xcmScript={XCMScript} />
		</div>
	);
};

const LicenseHelmet = ({ script, xcmScript }) => (
	<Helmet>
		<script
			type="text/javascript"
			src={`https://${script}.snippet.antillephone.com/apg-seal.js?v=${Date.now()}`}
		/>
		<script
			type="text/javascript"
			src={`https://${xcmScript}.seals-xcm.certria.com/xcm-seal.js?v=${Date.now()}`}
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

export default License;
