import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/password/forgetPassword";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout showFooter={true}>
				<main>
					<section className="inside">
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
