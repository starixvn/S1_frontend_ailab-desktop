import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Livecasino from "../components/livecasino/livecasino";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby casino">
					<Livecasino />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
