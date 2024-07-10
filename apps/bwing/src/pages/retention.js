import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import RetentionContent from "../components/retention";

export default () => {
	return (
		<Wrapper>
			<Layout showFooter={true}>
				<RetentionContent />
			</Layout>
		</Wrapper>
	);
};
