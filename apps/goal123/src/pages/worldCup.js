import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import WorldCup from "../components/worldCup/main";
import WorldCupWrapper from "../components/worldCup/wrapper";

export default () => (
	<Wrapper>
		<WorldCupWrapper>
			<Layout>
				<main className="worldcupEvent">
					<WorldCup />
				</main>
				<HomeFooter />
			</Layout>
		</WorldCupWrapper>
	</Wrapper>
);
