import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Content from "../components/appDownload/appDownload";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main className="app">
					<Content />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
