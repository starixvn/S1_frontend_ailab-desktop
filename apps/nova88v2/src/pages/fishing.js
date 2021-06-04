import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Fishing from "../components/fishing/fishing";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="fishinginside">
					<Fishing />
				</main>
			</Layout>
		</Wrapper>
	);
};
