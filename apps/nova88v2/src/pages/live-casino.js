import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import LivecasinoNew from "../components/livecasinoNew/livecasinoNew";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="livecasinoinside newDesign">
					<LivecasinoNew />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
