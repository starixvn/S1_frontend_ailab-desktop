import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LiveCasino from "../components/livecasino/livecasino";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<main className="lobby casino">
					<LiveCasino />
				</main>
			</Layout>
		</Wrapper>
	);
};
