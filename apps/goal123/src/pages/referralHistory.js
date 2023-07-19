import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
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
			<Footer />
		</Layout>
	</Wrapper>
);
