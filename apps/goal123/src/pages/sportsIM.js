import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";
import productList from "../datas/productList";

export default () => (
	<Wrapper afterLogin={true}>
		<Layout>
			<Content />
		</Layout>
	</Wrapper>
);

const Content = () => {
	const { userInfo } = useContext(userInfoContext);
	const { tpId, tpGameType, gameId } = productList.sports_IM;

	return (
		<main className="sports">
			<section className="inside">
				<iframe
					title="sport"
					target="sport_iframe"
					src={GET_ENTER_PAGE_URL({
						langId: userInfo.langId,
						tpId,
						gameId,
						matchid: null,
						betType: null,
						isLogin: userInfo.isLogin,
						tpGameType
					})}
				/>
			</section>
		</main>
	);
};
