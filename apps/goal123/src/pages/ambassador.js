import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import AmbassadorContent from "../components/ambassador/index";

const Ambassador = () => {
	return (
		<Wrapper>
			<Layout>
				<AmbassadorContent />
				<Footer />
			</Layout>
		</Wrapper>
	);
};

export default Ambassador;
