import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import NewHome from "../components/home/NewHome";
import HomeFooter from "../components/footer/HomeFooter";

const IndexPage = () => {
	return (
		<Wrapper>
			<Layout>
				<NewHome />
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};

export default IndexPage;
