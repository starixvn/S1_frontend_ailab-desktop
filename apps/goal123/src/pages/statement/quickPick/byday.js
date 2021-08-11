import React from "react";
import Wrapper from "../../../components/common/wrapper";
import Layout from "../../../components/common/layout";
import Footer from "../../../components/footer/footer";
import Content from "../../../components/statement/byday";
import LeftMenu from "../../../components/common/leftMenu";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule statementPage">
							<Content />
						</div>
					</section>
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
