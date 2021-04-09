import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Casino from "../components/casino/casino";
import SideBarQuickLink from "../components/home/sideBarQuickLink";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<Casino />
					{/* <SideBarQuickLink /> */}
				</main>
			</Layout>
		</Wrapper>
	);
};
