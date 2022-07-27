import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { defMenuLinks } from "./header.menu.def";
import LinkItems, { getCurrentPage } from "../common/linkItems";
// import { siteInfo } from "../../config";
import { bannerImgUrl } from "../../config";
import path from "../../router";
import {
	defEventPeriod,
	showEventIcon,
	defEventIcon
} from "../common/eventIcon";

const Main = ({ showSubMenu, productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const currentPage = getCurrentPage();

	const worldCupNewTag = showEventIcon({
		icon: defEventIcon.new,
		period: defEventPeriod.worldCup
	});

	return (
		<>
			<Link
				to={`/${userInfo.langId}`}
				className={
					currentPage === `/${userInfo.langId}` ? "active" : ""
				}>
				<i className="icon icon-home" />
			</Link>
			<Link
				to={`/${userInfo.langId}/${path.sports.root}?tpId=1&gameId=2002`}
				className={`event icon ${worldCupNewTag}`}>
				<img
					src={`${bannerImgUrl}/img/worldcup/xs-logo-d.png`}
					alt="world cup"
				/>
			</Link>
			<LinkItems
				mainKey="header-"
				defMenuLinks={defMenuLinks}
				t={t}
				showSubMenu={showSubMenu}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				checkMatchPage={true}
				toUpperCase={true}
				productTpIds={productTpIds}
			/>
			{/* <a
				href={siteInfo({ langId: userInfo.langId }).affiliateLink}
				target="_blank">
				{t("lbl_Affiliates")?.toUpperCase()}
			</a> */}
		</>
	);
};

Main.defaultProps = {
	showSubMenu: () => null,
	productTpIds: null
};

Main.propTypes = {
	showSubMenu: PropTypes.func,
	productTpIds: PropTypes.arrayOf(PropTypes.any)
};

export default Main;
