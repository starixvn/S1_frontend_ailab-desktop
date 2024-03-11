import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Lottery from "../components/lottery/lottery";

export default () => (
	<Wrapper>
		<Layout>
			<main className="lotterylobby">
				<Lottery />
			</main>
			<HomeFooter />
		</Layout>
	</Wrapper>
);
