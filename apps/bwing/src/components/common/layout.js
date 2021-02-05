import React, { useContext } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext } from "./context";
import SideBarQuickLink from "../home/sideBarQuickLink";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);

	return (
		<>
			<SEO />
			<Header />
			{children}
			{showFooter ? <Footer /> : null}
			<SideBarQuickLink />
			<PopBox />
			{loading ? <Loading /> : null}
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
