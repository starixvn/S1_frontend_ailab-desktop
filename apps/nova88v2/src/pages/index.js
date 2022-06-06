import React from "react";
import PropTypes from "prop-types";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/home/home";
import PromotionWrapper from "../components/promotion/promotion.wrapper";

const IndexPage = ({ location }) => (
	<Wrapper>
		<PromotionWrapper>
			<Layout showFooter={true} isFullFooter={true}>
				<Content location={location} />
			</Layout>
		</PromotionWrapper>
	</Wrapper>
);

IndexPage.propTypes = {
	location: PropTypes.objectOf(PropTypes.any).isRequired
};
export default IndexPage;
