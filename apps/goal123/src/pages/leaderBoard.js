import React from "react";
import LeaderBoard from "../components/leaderBoard/index";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Wrapper from "../components/common/wrapper";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="leaderboard">
					<LeaderBoard />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
