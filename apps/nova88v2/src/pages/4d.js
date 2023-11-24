import React from "react";
import FourD from "../components/4d/4d";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Wrapper from "../components/common/wrapper";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby">
					<FourD />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
