import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import productList from "../datas/productList";
import { getUrlParameter } from "../components/common/common";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";
import { defSpecialSetting } from "../components/hook/useGotoGame";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<Content />
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { userInfo } = useContext(userInfoContext);
	const tpId = getUrlParameter("tpId");
	const gameId = getUrlParameter("gameId");
	const matchid = getUrlParameter("matchid");
	const tpGameType =
		getUrlParameter("tpGameType") || productList.sports.tpGameType;
	const _tpId = isNaN(tpId) ? tpId : Number(tpId);
	const iframeUrl =
		_tpId === defSpecialSetting.sports_9w
			? ""
			: GET_ENTER_PAGE_URL(
					userInfo.langId,
					tpId,
					gameId,
					matchid,
					null,
					tpGameType
			  );

	return (
		<main>
			<section className="inside">
				<iframe title="sport" target="sport_iframe" src={iframeUrl} />
			</section>
		</main>
	);
};
