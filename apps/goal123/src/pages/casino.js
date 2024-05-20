import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Casino from "../components/casino/casino";
import HomeFooter from "../components/footer/HomeFooter";
import LobbyBottomBanner from "../components/common-lobby/LobbyBottomBanner";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="fullSize lobby">
					<Casino />
					<LobbyBottomBanner />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
