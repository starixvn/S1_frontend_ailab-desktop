import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Lottery from "../components/lottery/lottery";

export default () => (
	<Wrapper>
		<Layout>
			<main className="lotterylobby">
				<Lottery />
			</main>
			<Footer />
		</Layout>
	</Wrapper>
);
