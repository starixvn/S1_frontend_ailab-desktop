import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Footer from "../components/footer/footer";
import Content from "../components/appDownload/appDownload";
import GoTopBtn from "../components/common/goTopBtn";

export default () => {
	return (
		<Wrapper>
			<SEO />
			<Content />
			<Footer />
			<GoTopBtn />
		</Wrapper>
	);
};
