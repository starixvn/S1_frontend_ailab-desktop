import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home.v2";
import SideBarQuickLink from "../components/home/sideBarQuickLink";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<Content />
				<SideBarQuickLink />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
