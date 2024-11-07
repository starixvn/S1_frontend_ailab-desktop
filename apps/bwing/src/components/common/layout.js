import React, { useContext, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@ailab-desktop/store";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext } from "./context";
import GoTopBtn from "./goTopBtn";
import Survey from "./survey";

const Layout = ({
	children,
	showHeader = true,
	showFooter = false,
	goTopBtn
}) => {
	const { loading } = useContext(loadingContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	return (
		<Provider store={store}>
			<ToastContainer /> {/* 吐司訊息 */}
			{showHeader ? <Header /> : null}
			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
			{loading ? <Loading /> : null}
			{goTopBtn ? <GoTopBtn /> : null}
			<Survey />
		</Provider>
	);
};

Layout.defaultProps = {
	showHeader: true,
	showFooter: false,
	goTopBtn: true
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	showHeader: PropTypes.bool,
	showFooter: PropTypes.bool,
	goTopBtn: PropTypes.bool
};

export default Layout;
