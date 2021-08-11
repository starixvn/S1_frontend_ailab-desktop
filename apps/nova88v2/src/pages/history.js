import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import LeftMenu from "../components/common/leftMenu";
import Content from "../components/history/history";

const History = () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
				<Footer />
			</Layout>
		</Wrapper>
	);
};

export default History;
