import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import RetentionContent from "../components/retention";

const RetentionPage = () => {
	return (
		<Wrapper>
			<Layout>
				<RetentionContent />
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};

export default RetentionPage;
