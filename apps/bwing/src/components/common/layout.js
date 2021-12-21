import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext } from "./context";
import GoTopBtn from "./goTopBtn";

const Layout = ({ children, showFooter = false, goTopBtn }) => {
	const { loading } = useContext(loadingContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<>
			<SEO />
			<Header />
			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
			{loading ? <Loading /> : null}
			{goTopBtn ? <GoTopBtn /> : null}
		</>
	);
};

Layout.defaultProps = {
	showFooter: false,
	goTopBtn: true
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	showFooter: PropTypes.bool,
	goTopBtn: PropTypes.bool
};

export default Layout;
