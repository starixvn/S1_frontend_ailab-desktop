import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Deposit from "../components/depositnew/depositnew";
import LeftMenu from "../components/common/leftMenu";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout showFooter={true}>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Deposit />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};
