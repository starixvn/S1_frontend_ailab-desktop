import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import LeftMenu from "../components/common/leftMenu";
import Message from "../components/message/message";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Message />
						</div>
					</section>
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
