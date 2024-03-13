import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Vip from "../components/vip/vip";

export default function vip() {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<>
					<Vip />
					<HomeFooter />
				</>
			</Layout>
		</Wrapper>
	);
}
