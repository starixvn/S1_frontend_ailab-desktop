import React, { useContext } from "react";
import { userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import { getUrlParameter } from "../components/common/common";
import { GET_ENTER_PAGE_URL } from "../service/enterPage";
import SideBarQuickLink from "../components/home/sideBarQuickLink";

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
	return (
		<main>
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
			{/* <SideBarQuickLink /> */}
		</main>
	);
};
