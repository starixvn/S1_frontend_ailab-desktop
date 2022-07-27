import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import WorldCup from "../components/worldCup/main";
import WorldCupWrapper from "../components/worldCup/wrapper";

export default () => (
	<Wrapper>
		<WorldCupWrapper>
			<Layout>
				<main className="worldCup">
					<WorldCup />
				</main>
				<Footer />
			</Layout>
		</WorldCupWrapper>
	</Wrapper>
);
