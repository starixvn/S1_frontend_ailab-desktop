import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import MysteryBox from "../components/mysteryBox/mysteryBox";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<MysteryBox />
				</main>
			</Layout>
		</Wrapper>
	);
};
