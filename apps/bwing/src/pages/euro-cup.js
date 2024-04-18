import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import EuroCup from "../components/euroCup/euroCup";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="euro">
					<EuroCup />
				</main>
			</Layout>
		</Wrapper>
	);
};
