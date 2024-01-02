import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import DragonEgg from "../components/dragonEgg";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main className="dragonegg-event">
					<DragonEgg />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
