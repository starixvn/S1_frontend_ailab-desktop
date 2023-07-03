import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Sponsor from "../components/sponsor/sponsor";

export default function sponsor() {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<Sponsor />
				<Footer />
			</Layout>
		</Wrapper>
	);
}
