import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import OneGame from "../components/oneGame/oneGame";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<OneGame />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
