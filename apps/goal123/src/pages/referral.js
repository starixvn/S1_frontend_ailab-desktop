import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import LeftMenu from "../components/common/leftMenu";
import Referral from "../components/referral/referral";
import ReferralWrapper from "../components/referral/referral.wrapper";

export default () => (
	<Wrapper afterLogin={true}>
		<ReferralWrapper>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule refer">
							<Referral />
						</div>
					</section>
				</main>
				<HomeFooter />
			</Layout>
		</ReferralWrapper>
	</Wrapper>
);
