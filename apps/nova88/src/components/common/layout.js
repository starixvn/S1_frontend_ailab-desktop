import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "../header/header";
import Footer from "../footer/footer";
import PopBox from "./popBox";
import Loading from "./loading";
import "../../styles/css/swiper.css";
import "../../styles/css/style.css";
import "../../styles/css/font.css";
import "../../styles/css/datePicker.css";
import CanvasFireworks from "./canvasFireworks";

const Layout = ({ children, showFooter = false }) => {
	return (
		<>
			<CanvasFireworks />
			{/* new year style ↑ */}
			<Header />
			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
			<Loading />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
