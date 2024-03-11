import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import CockFighting from "../components/cockFighting/cockFighting";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<CockFighting />
			</Layout>
		</Wrapper>
	);
};
