import React from "react";
import Wrapper from "../../components/common/wrapper";
import Layout from "../../components/common/layout";
import Footer from "../../components/footer/footer";
import LeftMenu from "../../components/common/leftMenu";
import RecentHistory from "../../components/deposit/deposit.recentHistory";
import CryptoPay from "../../components/deposit/cryptoPay.set";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<CryptoPay />
							<RecentHistory />
						</div>
					</section>
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};
