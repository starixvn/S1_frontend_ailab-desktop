import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Games from "../components/games/games";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="gameslobby">
					<Games />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
