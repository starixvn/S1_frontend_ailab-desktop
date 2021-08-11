import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
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
				<Footer />
			</Layout>
		</Wrapper>
	);
};
