import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home";
import PromotionWrapper from "../components/promotion/promotion.wrapper";

const IndexPage = ({ location }) => {
	return (
		<Wrapper getSEOInfoFromAPI={true}>
			<PromotionWrapper>
				<Layout showFooter={true} isFullFooter={true}>
					<Content location={location} />
				</Layout>
			</PromotionWrapper>
		</Wrapper>
	);
};

export default IndexPage;
