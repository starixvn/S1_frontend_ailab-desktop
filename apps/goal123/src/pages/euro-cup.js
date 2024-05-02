import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import EuroCup from "../components/euroCup/EuroCup";
import HomeFooter from "../components/footer/HomeFooter";

export default () => (
	<Wrapper>
		<Layout>
			<main className="euro">
				<EuroCup />
			</main>
			<HomeFooter />
		</Layout>
	</Wrapper>
);
