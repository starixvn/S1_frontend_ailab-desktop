import React, {
	useContext,
	useEffect,
	useRef,
	Children,
	isValidElement,
	cloneElement
} from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext, productTpIdsContext } from "./context";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const childrenWithProps = Children.map(children, child =>
		isValidElement(child) ? cloneElement(child, { productTpIds }) : child
	);

	return (
		<>
			<SEO />
			<Header />
			{childrenWithProps}

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
