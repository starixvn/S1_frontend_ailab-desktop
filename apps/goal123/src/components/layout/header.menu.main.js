import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { defMenuLinks } from "./header.menu.def";
import LinkItems, { getCurrentPage } from "../common/linkItems";

export default ({ showSubMenu, productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const currentPage = getCurrentPage();

	return (
		<>
			<Link
				to={`/${userInfo.langId}`}
				className={
					currentPage === `/${userInfo.langId}` ? "active" : ""
				}>
				<i className="icon icon-home" />
			</Link>
			<LinkItems
				defMenuLinks={defMenuLinks(userInfo.langId)}
				t={t}
				showSubMenu={showSubMenu}
				langId={userInfo.langId}
				isLogin={userInfo.isLogin}
				checkMatchPage={true}
				toUpperCase={true}
				productTpIds={productTpIds}
			/>
		</>
	);
};
