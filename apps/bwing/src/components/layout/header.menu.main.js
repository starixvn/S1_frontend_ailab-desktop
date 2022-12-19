import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { defMenuLinks } from "./header.menu.def";
import LinkItems, { getCurrentPage } from "../common/linkItems";
// import { siteInfo } from "../../config";

const Main = ({ showSubMenu, productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const currentPage = getCurrentPage();

	return (
		<>
			<Link
				to={`/${userInfo.langId}`}
				className={
					currentPage === `/${userInfo.langId}` ? "active" : ""
				}
			>
				<i className="icon icon-home" />
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
