import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/promotion/promotion";
import { Promotion } from "@ailab-desktop/promotion";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<section className="inside">
						<div className="rightModule">
							{/* <Content /> */}
							<Promotion />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
