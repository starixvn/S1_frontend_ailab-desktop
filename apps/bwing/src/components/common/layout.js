import React, { useContext } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import AngpowLink from "../home/angpowLink";

import { loadingContext, userInfoContext } from "./context";
import path from "../../router";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);

	return (
		<>
			<SEO />
			<Header />
			<div className="newyear">
				<AngpowLink
					to={`/${userInfo.langId}/${path.angpow.root}`}
					langId={userInfo.langId}
				/>
			</div>
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
