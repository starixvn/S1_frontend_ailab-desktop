import React from "react";
import Wrapper from "../../../../components/common/wrapper";
import Layout from "../../../../components/common/layout";
import Content from "../../../../components/statement/category";
import LeftMenu from "../../../../components/common/leftMenu";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
