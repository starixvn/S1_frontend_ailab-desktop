import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
	const vkey = `${Date.now()}`;
	return (
		<html lang="en" {...props.htmlAttributes}>
			<head>
				<meta charSet="utf-8" />
				<meta httpEquiv="x-ua-compatible" content="ie=edge" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href={`/styles/css/swiper.css?v=${vkey}`}
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href={`/styles/css/style.css?v=${vkey}`}
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href={`/styles/css/font.css?v=${vkey}`}
				/>
				<link
					rel="stylesheet"
					type="text/css"
					href={`/styles/css/datePicker.css?v=${vkey}`}
				/>

				<script
					async
					type="text/javascript"
					src="https://tickers2.playtech.com/jackpots/new_jackpotjs.js"
				/>

				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{/* <!-- Google Tag Manager (noscript) --> */}
				<noscript>
					<iframe
						title="GTM"
						src="https://www.googletagmanager.com/ns.html?id=GTM-NKP2DBN"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
				{/* <!-- End Google Tag Manager (noscript) --> */}

				{props.preBodyComponents}
				<div
					key="body"
					id="___gatsby"
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
				{props.postBodyComponents}
			</body>
			<footer>
				{/* <script */}
				{/* 	async="" */}
				{/* 	defer="" */}
				{/* 	src="//scqa2.detecas.com/activator.ashx" */}
				{/* /> */}
			</footer>
		</html>
	);
}

HTML.defaultProps = {
	htmlAttributes: {},
	headComponents: [],
	bodyAttributes: {},
	preBodyComponents: [],
	body: "",
	postBodyComponents: []
};

HTML.propTypes = {
	htmlAttributes: PropTypes.objectOf(PropTypes.any),
	headComponents: PropTypes.arrayOf(PropTypes.any),
	bodyAttributes: PropTypes.objectOf(PropTypes.any),
	preBodyComponents: PropTypes.arrayOf(PropTypes.any),
	body: PropTypes.string,
	postBodyComponents: PropTypes.arrayOf(PropTypes.any)
};
