import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { getUrlParameter } from "../components/common/common";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";
import productList from "../datas/productList";

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
	const game = getUrlParameter("game");
	const tpId = productList[game]?.tpId;
	const gameId = productList[game]?.gameId;
	const matchid = getUrlParameter("matchid");
	return (
		<main className="sports">
			<section className="inside">
				<iframe
					title="sport"
					target="sport_iframe"
					src={GET_ENTER_PAGE_URL(
						userInfo.langId,
						tpId,
						gameId,
						matchid
					)}
				/>
			</section>
		</main>
	);
};
