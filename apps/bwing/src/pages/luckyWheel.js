import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import LuckyWheel from "../components/luckyWheel/luckyWheel";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main className="luckybox">
					<LuckyWheel />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
