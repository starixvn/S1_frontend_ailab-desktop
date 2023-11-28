import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Esport from "../components/eSport/eSport";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby">
					<Esport />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
