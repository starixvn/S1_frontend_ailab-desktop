import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import DragonEgg from "../components/dragonEgg";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main className="dragonegg-event">
					<DragonEgg />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
