import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import LeftMenu from "../components/common/leftMenu";
import ReferralHistory from "../components/referralHistory/referralHistory";

export default () => (
	<Wrapper afterLogin={true}>
		<Layout>
			<main>
				<section className="inside">
					<LeftMenu />
					<div className="rightModule">
						<ReferralHistory />
					</div>
				</section>
			</main>
			<HomeFooter />
		</Layout>
	</Wrapper>
);
