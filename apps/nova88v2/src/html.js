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
					rel="alternate"
					media="only screen and (max-width: 640px)"
					href="https://m.nova88.net/"
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

				{/* <script
					type="text/javascript"
					src="https://a7019fa5-9f9a-468b-92da-4890f6a6e4a7.snippet.antillephone.com/apg-seal.js"
				/>
				<script
					type="text/javascript"
					src="https://226e4de2-30aa-4077-951b-d440012994f3.seals-xcm.certria.com/xcm-seal.js"
				/> */}
				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{props.preBodyComponents}
				<div
					key="body"
					id="___gatsby"
					// eslint-disable-next-line
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>

				{/* <!-- Google Tag Manager (noscript) --> */}
				<noscript>
					<iframe
						src="https://www.googletagmanager.com/ns.html?id=GTM-5VD4484"
						title="GTM"
						height="0"
						width="0"
						style={{ display: "none", visibility: "hidden" }}
					/>
				</noscript>
				{/* <!-- End Google Tag Manager (noscript) --> */}

				{props.postBodyComponents}
			</body>
			<footer>
				<script
					async=""
					defer=""
					src="//scqa2.detecas.com/activator.ashx"
					type="text/javascript"
				/>
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
