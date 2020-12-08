import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import LeaderBoard from "../components/leaderBoard/leaderBoard";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<section className="ranking rankRecords">
						<LeaderBoard />
					</section>
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
