import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Content from "../components/join/join";

export default () => {
	return (
		<Wrapper onlyBeforeLogin={true}>
			<Layout>
				<main className="joinlogin">
					<Content />
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
