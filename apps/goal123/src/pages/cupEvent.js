import React from "react";
import Wrapper from "../components/common/wrapper";
import WorldCupWrapper from "../components/worldCup/wrapper";
import Layout from "../components/common/layout";
import CupEvent from "../components/cupEvent/cupEvent";
import Footer from "../components/footer/footer";

export default () => (
	<Wrapper>
		<WorldCupWrapper>
			<Layout>
				<main className="euro">
					<CupEvent />
				</main>
				<Footer />
			</Layout>
		</WorldCupWrapper>
	</Wrapper>
);
