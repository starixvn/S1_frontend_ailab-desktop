import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import Referral from "../components/referral/referral";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout showFooter={true}>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Referral />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
