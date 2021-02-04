import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import AngPow from "../components/angPow/angPow";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<AngPow />
				</main>
			</Layout>
		</Wrapper>
	);
};
