import React, { useContext } from "react";
import { products } from "@ailab-desktop/common";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { getUrlParameter } from "../components/common/common";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";

export default () => (
	<Wrapper>
		<Layout>
			<Content />
		</Layout>
	</Wrapper>
);

const Content = () => {
	const { userInfo } = useContext(userInfoContext);

	const game = getUrlParameter("game");
	const tpId = products[game]?.tpId;
	const tpGameType = products[game]?.tpGameType;
	const gameId = products[game]?.gameId || null;
	// * matchId 從 hotEvent api 取得
	const matchid = getUrlParameter("matchid") || null;
	const betType = products[game]?.betType || null;

	return (
		<main className="sportpage">
			<section className="inside">
				<iframe
					title="sport"
					target="sport_iframe"
					src={GET_ENTER_PAGE_URL({
						tpId,
						gameId,
						tpGameType,
						matchid,
						betType,
						langId: userInfo.langId,
						isLogin: userInfo.isLogin
					})}
				/>
			</section>
		</main>
	);
};
