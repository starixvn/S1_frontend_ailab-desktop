import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import CasinoLobby from "../components/casinoLobby/casinoLobby";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby slots">
					<CasinoLobby />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
