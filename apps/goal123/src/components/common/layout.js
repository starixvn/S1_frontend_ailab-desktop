import React, {
	useContext,
	useEffect,
	useRef,
	Children,
	isValidElement,
	cloneElement
} from "react";
import { Provider } from "react-redux";
import { store } from "@ailab-desktop/store";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext, productTpIdsContext } from "./context";
import GoTopBtn from "./goTopBtn";
import HomeFooter from "../home/new-ui-components/HomeFooter";

const Layout = ({
	children,
	showHeader = true,
	showFooter = false,
	goTopBtn
}) => {
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
		isValidElement(child)
			? cloneElement(child, { producttpids: productTpIds })
			: child
	);

	return (
		<Provider store={store}>
			{showHeader ? <Header /> : null}
			{childrenWithProps}

			{/* {showFooter ? <Footer /> : null} */}
			{showFooter ? <HomeFooter /> : null}

			<PopBox />
			{loading ? <Loading /> : null}
			{goTopBtn ? <GoTopBtn /> : null}
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
