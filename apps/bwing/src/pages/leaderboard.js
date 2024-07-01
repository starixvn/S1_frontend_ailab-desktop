import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Leaderboard from "../components/leaderboard";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<Leaderboard />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
