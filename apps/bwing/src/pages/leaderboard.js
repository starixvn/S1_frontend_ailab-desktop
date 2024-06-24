import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Leaderboard from "../components/leaderboard";
import { LeaderboardProvider } from "../components/leaderboard/leaderboardContext/Leaderboard-context";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<LeaderboardProvider>
					<main>
						<Leaderboard />
					</main>
					<Footer />
				</LeaderboardProvider>
			</Layout>
		</Wrapper>
	);
};
