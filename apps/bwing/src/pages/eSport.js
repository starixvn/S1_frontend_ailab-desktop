import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Esport from "../components/eSport/eSport";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="lobby esports">
					<Esport />
				</main>
			</Layout>
		</Wrapper>
	);
};
