import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Lottery from "../components/lottery/lottery";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lotteryinside">
					<Lottery />
				</main>
			</Layout>
		</Wrapper>
	);
};
