import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Game from "../components/game/game";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="gameinside">
					<Game />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
