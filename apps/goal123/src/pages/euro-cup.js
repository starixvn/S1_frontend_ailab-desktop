import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import EuroCup from "../components/euroCup/euroCup";
import Footer from "../components/footer/footer";

export default () => (
	<Wrapper>
		<Layout>
			<main className="euro">
				<EuroCup />
			</main>
			<Footer />
		</Layout>
	</Wrapper>
);
