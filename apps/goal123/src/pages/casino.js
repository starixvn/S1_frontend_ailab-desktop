import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Casino from "../components/casino/casino";
import HomeFooter from "../components/footer/HomeFooter";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="fullSize">
					<Casino />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
