import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import LuckyWheel from "../components/luckyWheel/luckyWheel";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main className="wheelEvent">
					<LuckyWheel />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
