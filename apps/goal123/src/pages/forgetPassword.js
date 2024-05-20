import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Content from "../components/password/forgetPassword";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main className="joinlogin">
					<section className="inside">
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
