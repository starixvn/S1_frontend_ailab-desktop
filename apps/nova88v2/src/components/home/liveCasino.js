import React, { useEffect, useRef } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import path from "../../router";
import { bannerImgUrl } from "../../config";

const Content = () => {
	const { t } = useTranslation();

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<div className="liveTv">
			<div className="moduleTitle">{t("lbl_LiveCasino")}</div>
			<div className="liveCasinoBox">
				<div className="content">
					<div className="title">{t("lbl_CasinoWithLive")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo1")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo2")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo3")}</div>
					<Link to={path.liveCasino.root}>
						<button>{t("lbl_PlayNow")}</button>
					</Link>
				</div>
				<img
					src={`${bannerImgUrl}/desktop/img/homepage/livecasinobg.jpg`}
					alt=""
				/>
			</div>
		</div>
	);
};

export default Content;
