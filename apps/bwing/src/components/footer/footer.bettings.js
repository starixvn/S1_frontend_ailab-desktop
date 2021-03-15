import React from "react";
import { defSportsBetting } from "./footer.def";
import LinkItems from "../common/linkItems";

export default ({ t, langId, isLogin, productTpIds }) => {
	return (
		<div>
			<span className="title">{t("lbl_SportsBetting")}</span>
			<div>
				<LinkItems
					mainKey="footer-"
					defMenuLinks={defSportsBetting}
					t={t}
					langId={langId}
					isLogin={isLogin}
					checkMatchPage={false}
					productTpIds={productTpIds}
				/>
			</div>
		</div>
	);
};
