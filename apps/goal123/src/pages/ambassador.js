import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import AmbassadorContent from "../components/ambassador/index";
import HomeFooter from "../components/footer/HomeFooter";

const Ambassador = () => {
	return (
		<Wrapper>
			<Layout>
				<AmbassadorContent />
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};

export default Ambassador;
