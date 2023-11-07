import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Games from "../components/games/games";

export default () => (
	<Wrapper>
		<Layout showFooter={true}>
			<main className="lobby games">
				<Games />
			</main>
		</Layout>
	</Wrapper>
);
