import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import CockFighting from "../components/cockFighting/cockFighting";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<CockFighting />
				<Footer />
			</Layout>
		</Wrapper>
	);
};
