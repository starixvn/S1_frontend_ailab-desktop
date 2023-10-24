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

	// * 由於沒有接客服，因此直接導去 SKYPE 對話
	const skypeLiveChatID = "skype:live:.cid.107160064a80f075?chat";

	return (
		<Provider store={store}>
			{showHeader ? <Header /> : null}
			{children}
			{showFooter ? <Footer isFullFooter={isFullFooter} /> : null}
			<PopBox />
			<Loading />
			{goTopBtn ? <GoTopBtn /> : null}

			<a
				href={skypeLiveChatID}
				target="_blank"
				className="contact-icon"
				rel="noreferrer"
			>
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/skype-icon.png`}
					alt=""
				/>
			</a>
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
