import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Profile from "../components/profile/profile";
import LeftMenu from "../components/common/leftMenu";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Profile />
						</div>
					</section>
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
