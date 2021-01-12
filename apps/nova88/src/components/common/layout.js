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

// const Canvas = () => {
// 	let canvasRef = useRef(null);
// 	return (
// 		<canvas
// 			ref={canvasRef}
// 			id="canvas"
// 			width={window.innerWidth}
// 			height={window.innerHeight}
// 		>
// 			Canvas is not supported in your browser.
// 		</canvas>
// 	);
// };

const Layout = ({ children, showFooter = false }) => {
	return (
		<>
			{/* new year style */}
			{/* <Canvas /> */}
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
