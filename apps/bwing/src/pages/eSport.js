import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import ESport from "../components/eSport/eSport";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="lobby esports">
					<ESport />
				</main>
			</Layout>
		</Wrapper>
	);
};
