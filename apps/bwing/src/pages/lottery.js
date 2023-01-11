import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Lottery from "../components/lottery/lottery";

export default () => (
	<Wrapper>
		<Layout showFooter={true}>
			<main className="lotterylobby">
				<Lottery />
			</main>
		</Layout>
	</Wrapper>
);
