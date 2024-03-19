import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Footer from "../components/footer/footer";
import SponsorContent from "../components/sponsor/index";

const PageContent = () => {
	return (
		<main className="ambassador">
			<SponsorContent />
		</main>
	);
};

const Sponsor = () => {
	return (
		<Wrapper>
			<Layout>
				<PageContent />
				<Footer />
			</Layout>
		</Wrapper>
	);
};

export default Sponsor;
