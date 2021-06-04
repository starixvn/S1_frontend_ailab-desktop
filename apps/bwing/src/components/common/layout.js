import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext } from "./context";

const Layout = ({ children, showFooter = false }) => {
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
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
