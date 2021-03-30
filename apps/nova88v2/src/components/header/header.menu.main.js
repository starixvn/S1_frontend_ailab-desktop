import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { defMenuLinks, defMenuType } from "./header.menu.def";
import LinkItems from "../common/linkItems";

export default ({ showSubMenu, currentMenuKey, productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<LinkItems
			defMenuLinks={defMenuLinks}
			defMenuType={defMenuType}
			t={t}
			showSubMenu={showSubMenu}
			currentMenuKey={currentMenuKey}
			langId={userInfo.langId}
			isLogin={userInfo.isLogin}
			checkMatchPage={true}
			toUpperCase={true}
			productTpIds={productTpIds}
		/>
	);
};
