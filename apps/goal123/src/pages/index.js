import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<Content isIndex={true} />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
