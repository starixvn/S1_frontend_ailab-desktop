import React from "react";
import Wrapper from "./common/wrapper";
import Layout from "./common/layout";
import AngPow from "./angPow/angPow";

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
