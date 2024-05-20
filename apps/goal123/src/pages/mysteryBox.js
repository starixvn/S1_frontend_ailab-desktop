import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import MysteryBox from "../components/mysteryBox/mysteryBox";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<MysteryBox />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
