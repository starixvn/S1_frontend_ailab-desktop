import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Livecasino from "../components/livecasino/livecasino";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="livelobby">
					<Livecasino />
				</main>
			</Layout>
		</Wrapper>
	);
};
