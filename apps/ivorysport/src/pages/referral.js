import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
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
						<div className="rightModule">
							<Referral />
						</div>
					</section>
				</main>
				<Footer />
			</Layout>
		</ReferralWrapper>
	</Wrapper>
);
