import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Content from "../components/join/join";

export default () => {
	return (
		<Wrapper onlyBeforeLogin={true}>
			<Layout>
				<main className="joinlogin">
					<Content />
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
