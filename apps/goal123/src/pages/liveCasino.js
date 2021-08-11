import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Livecasino from "../components/livecasino/livecasino";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="livelobby">
					<Livecasino />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
