import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Casino from "../components/casino/casino";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby">
					<Casino />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
