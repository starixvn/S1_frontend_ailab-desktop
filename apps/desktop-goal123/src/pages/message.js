import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import Message from "../components/message/message";
import { TestComponent } from "@monorepo-ailabpte/test-component";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<TestComponent />
							<Message />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
