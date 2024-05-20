import React from "react";
import SEO from "../components/seo";
import Wrapper from "../components/common/wrapper";
import Content from "../components/appDownload/appDownload";
import GoTopBtn from "../components/common/goTopBtn";
import HomeFooter from "../components/footer/HomeFooter";

export default () => {
	return (
		<Wrapper>
			<SEO />
			<Content />
			<HomeFooter />
			<GoTopBtn />
		</Wrapper>
	);
};
