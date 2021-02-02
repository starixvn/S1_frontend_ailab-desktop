import React, { useContext } from "react";
import PropTypes from "prop-types";
import Header from "../layout/header";
import Footer from "../footer/footer";
import SEO from "../seo";
import PopBox from "./popBox";
import Loading from "./loading";
import { loadingContext } from "./context";

const Layout = ({ children, showFooter = false }) => {
	const { loading } = useContext(loadingContext);

	return (
		<>
			<SEO />
			<Header />
			{/* new year style ↓ */}
			<div className="newyear">
				<section className="flowerArea">
					<div className="allstars">
						<div className="star1" />
						<div className="star2" />
						<div className="star3" />
						<div className="star4" />
						<div className="star5" />
						<div className="star6" />
						<div className="star7" />
						<div className="star8" />
						<div className="star9" />
						<div className="star10" />
						<div className="star11" />
						<div className="star12" />
						<div className="star13" />
						<div className="star14" />
						<div className="star15" />
						<div className="star16" />
						<div className="star17" />
						<div className="star18" />
						<div className="star19" />
						<div className="star20" />
					</div>
				</section>
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
