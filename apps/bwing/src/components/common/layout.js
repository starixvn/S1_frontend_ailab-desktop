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
			{/* new year style ↓ */}
			<div className="flower" />
			<div className="flower flowerR" />
			<div className="newyear">
				<div className="newyearLeft">
					<div className="line" />
					<div className="lantern" />
					<div className="lantern" />
				</div>
				<div className="newyearLeft newyearRight">
					<div className="line" />
					<div className="lantern" />
					<div className="lantern" />
				</div>

				<AngpowLink to={`/${userInfo.langId}/${path.angpow.root}`} />
				{/* <a href="" className="money">
					<div className="box" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
				</a> */}
				<div className="cow" />
			</div>
			{/* new year style ↑ */}
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
