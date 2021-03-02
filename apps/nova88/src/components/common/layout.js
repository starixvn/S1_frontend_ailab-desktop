import React from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import Footer from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";

const Layout = ({ children, showFooter = false }) => {
	return (
		<>
			<Header />
			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
			<Loading />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
