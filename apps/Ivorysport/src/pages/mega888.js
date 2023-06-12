import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Component from "../components/mega888";

export default () => (
	<Wrapper>
		<Layout showFooter={true}>
			<main>
				<Component />
			</main>
		</Layout>
	</Wrapper>
);
