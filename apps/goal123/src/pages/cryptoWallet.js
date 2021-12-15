import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import CryptoWallet from "../components/cryptoWallet/cryptoWallet";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<CryptoWallet />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
