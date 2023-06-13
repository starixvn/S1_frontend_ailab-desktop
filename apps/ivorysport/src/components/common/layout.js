import React, { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { store } from "@ailab-desktop/store";
import PropTypes from "prop-types";
import Header from "../header/header";
import Footer from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";
import GoTopBtn from "./goTopBtn";

const Layout = ({
	children,
	showHeader = true,
	showFooter = false,
	isFullFooter,
	goTopBtn
}) => {
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<Provider store={store}>
			{showHeader ? <Header /> : null}
			{children}
			{showFooter ? <Footer isFullFooter={isFullFooter} /> : null}
			<PopBox />
			<Loading />
			{goTopBtn ? <GoTopBtn /> : null}
		</Provider>
	);
};

Layout.defaultProps = {
	showHeader: true,
	showFooter: false,
	isFullFooter: false,
	goTopBtn: true
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	showHeader: PropTypes.bool,
	showFooter: PropTypes.bool,
	isFullFooter: PropTypes.bool,
	goTopBtn: PropTypes.bool
};

export default Layout;
