import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home";
import NewHome from "../components/home/NewHome";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				{/* <NewHome /> */}
				<Content />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
