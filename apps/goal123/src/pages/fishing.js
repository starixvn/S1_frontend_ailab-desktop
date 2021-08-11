import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Fishing from "../components/fishing/fishing";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="fishinglobby">
					<Fishing />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
