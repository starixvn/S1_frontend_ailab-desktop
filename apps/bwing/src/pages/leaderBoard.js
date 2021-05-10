import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Leaderboard from "../components/leaderboard/leaderboard";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout showFooter={true}>
				<main>
					<Leaderboard />
				</main>
			</Layout>
		</Wrapper>
	);
};
