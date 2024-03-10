import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import NewHome from "../components/home/NewHome";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<NewHome />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
