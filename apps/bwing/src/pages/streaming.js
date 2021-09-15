import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Streaming from "../components/streaming/streaming";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<Streaming />
			</Layout>
		</Wrapper>
	);
};
