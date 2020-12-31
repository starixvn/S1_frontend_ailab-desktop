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
			{/*  xmas style ↓  */}
			<div className="Xmas">
				<div className="Xmas_left">
					<div className="snow1"></div>
					<div className="snow2"></div>
					<div className="snow3"></div>
					<div className="snow4"></div>
					<div className="snow5"></div>
					<div className="snow6"></div>
					<div className="snow7"></div>
					<div className="snow8"></div>
				</div>
				<div className="Xmas_right">
					<div className="snow1"></div>
					<div className="snow2"></div>
					<div className="snow3"></div>
					<div className="snow4"></div>
					<div className="snow5"></div>
					<div className="snow6"></div>
					<div className="snow7"></div>
					<div className="snow8"></div>
				</div>
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
