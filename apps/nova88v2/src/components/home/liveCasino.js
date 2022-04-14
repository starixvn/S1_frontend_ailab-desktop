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
			<div className="moduleTitle icon icon-livecasino">
				{t("lbl_LiveCasino")}
			</div>
			<div className="liveCasinoBox">
				<div className="content">
					<div className="title">{t("lbl_LiveCasino")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo1")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo2")}</div>
					<div className="info">{t("lbl_LiveCasinoInfo3")}</div>
					<Link to={path.liveCasino.root}>
						<button className="icon icon-casino">
							{t("lbl_PlayNow")}
						</button>
					</Link>
				</div>
				<img src={`${bannerImgUrl}/img/liveCasinoBox/bg.png`} alt="" />
			</div>
		</div>
	);
};

export default Content;
