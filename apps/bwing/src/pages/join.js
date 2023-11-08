import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Join from "../components/join/join";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<Join />
				</main>
			</Layout>
		</Wrapper>
	);
};
