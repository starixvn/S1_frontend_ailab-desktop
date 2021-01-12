import React, { useContext } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import "../../styles/css/swiper.css";
import "../../styles/css/style.css";
import "../../styles/css/font.css";
import "../../styles/css/datePicker.css";
import { loadingContext } from "../../components/common/context";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);

	return (
		<>
			<SEO />
			<Header />
			{/* new year style ↓ */}
			<div className="newyear">
				<div className="newyearLeft">
					<div className="line"></div>
					<div className="lantern"></div>
					<div className="lantern"></div>
				</div>
				<div className="newyearLeft newyearRight">
					<div className="line"></div>
					<div className="lantern"></div>
					<div className="lantern"></div>
				</div>
				<div className="money">
					<div className="box"></div>
					<div className="l"></div>
					<div className="l"></div>
					<div className="l"></div>
					<div className="l"></div>
					<div className="l"></div>
				</div>
				<div className="cow"></div>
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
