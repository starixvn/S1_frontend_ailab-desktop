import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home.v2";
import PromotionWrapper from "../components/promotion/promotion.wrapper";

const IndexPage = () => {
	return (
		<Wrapper>
			<PromotionWrapper>
				<Layout showFooter={true}>
					<Content />
				</Layout>
			</PromotionWrapper>
		</Wrapper>
	);
};

export default IndexPage;
