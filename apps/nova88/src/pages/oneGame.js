import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import SideBarQuickLink from "../components/home/sideBarQuickLink";
import OneGame from "../components/oneGame/oneGame";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout showFooter={true}>
				<main>
					<OneGame />
					<SideBarQuickLink />
				</main>
			</Layout>
		</Wrapper>
	);
};
