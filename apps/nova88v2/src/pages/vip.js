import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import Vip from "../components/vip/vip";

export default function vip() {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<Vip />
				<Footer />
			</Layout>
		</Wrapper>
	);
}
