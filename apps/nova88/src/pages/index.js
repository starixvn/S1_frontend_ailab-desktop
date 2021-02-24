import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home";

const IndexPage = ({ location }) => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<Content location={location} />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
