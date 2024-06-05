import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Footer from "../components/footer/footer";
import Content from "../components/appDownload/appDownload";
import GoTopBtn from "../components/common/goTopBtn";
import Layout from "../components/common/layout";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<SEO />
				<Content />
				<Footer />
				<GoTopBtn />
			</Layout>
		</Wrapper>
	);
};
