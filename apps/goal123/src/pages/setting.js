import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Setting from "../components/setting";
import LeftMenu from "../components/common/leftMenu";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main className="setting">
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Setting />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
