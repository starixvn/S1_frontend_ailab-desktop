import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import VipSwipper from "./vip.swipper";
import VipPage from "./vip.page";
import { defbanner, defPageClubImg } from "./vip.def";

const Vip = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	return (
		<main className="vip">
			<VipSwipper banner={defbanner(userInfo.langId)} />
			<VipPage
				pageClubImg={defPageClubImg}
				t={t}
				currencyId={currencyId}
			/>
		</main>
	);
};
export default Vip;
