import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Esport from "../components/eSport/eSport";
import HomeFooter from "../components/footer/HomeFooter";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby esports">
					<Esport />
					<HomeFooter />
				</main>
			</Layout>
		</Wrapper>
	);
};
