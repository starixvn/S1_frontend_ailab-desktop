import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import Referral from "../components/referral/referral";
import ReferralWrapper from "../components/referral/referral.wrapper";

export default () => (
	<Wrapper afterLogin={true}>
		<ReferralWrapper>
			<Layout showFooter={true}>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule refer">
							<Referral />
						</div>
					</section>
				</main>
			</Layout>
		</ReferralWrapper>
	</Wrapper>
);
