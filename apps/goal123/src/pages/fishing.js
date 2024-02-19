import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Fishing from "../components/fishing/fishing";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="lobby fishing">
					<Fishing />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
