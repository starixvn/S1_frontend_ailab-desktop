import React, { useContext } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import "../../styles/css/swiper.css";
import "../../styles/css/style.css";
import "../../styles/css/font.css";
import "../../styles/css/datePicker.css";

//*  xmas code ↓  */
const xmasDay = new Date(2020, 11, 25);
const afterXmas = new Date() > xmasDay;

const Layout = ({ children, showFooter = false }) => {
	return (
		<>
			<SEO />
			<Header />

			{/*  xmas style ↓  */}
			{afterXmas ? null : (
				<div className="christmas1">
					<img
						className="toplight"
						src={require("../../styles/img/christmas/toplight.png")}
						alt=""
					/>
					<img
						className="bells"
						src={require("../../styles/img/christmas/bells.png")}
						alt=""
					/>
					<div className="christmas1-left">
						<img
							className="tree"
							src={require("../../styles/img/christmas/tree.png")}
							alt=""
						/>
						<div className="star1"></div>
						<div className="star2"></div>
						<div className="star3"></div>
						<div className="star4"></div>
						<div className="star5"></div>
						<div className="star6"></div>
						<div className="star7"></div>
						<div className="star8"></div>
					</div>
					<div className="christmas1-right">
						<img
							className="tree tree2"
							src={require("../../styles/img/christmas/tree2.png")}
							alt=""
						/>
						<div className="star1"></div>
						<div className="star2"></div>
						<div className="star3"></div>
						<div className="star4"></div>
						<div className="star5"></div>
						<div className="star6"></div>
						<div className="star7"></div>
						<div className="star8"></div>
					</div>
					<img
						className="bomL"
						src={require("../../styles/img/christmas/bottomL.png")}
						alt=""
					/>
					<img
						className="bomR"
						src={require("../../styles/img/christmas/bottomR.png")}
						alt=""
					/>
				</div>
			)}
			{/*  xmas style ↑  */}

			{children}
			{showFooter ? <Footer /> : null}
			<PopBox />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired
};

export default Layout;
