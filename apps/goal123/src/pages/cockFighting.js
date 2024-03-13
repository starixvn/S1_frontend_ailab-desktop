import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import CockFighting from "../components/cockFighting/cockFighting";
import HomeFooter from "../components/footer/HomeFooter";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<CockFighting />
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
