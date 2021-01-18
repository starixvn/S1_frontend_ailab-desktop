import React from "react";
import PropTypes from "prop-types";

export default function HTML(props) {
	const vkey = `${Date.now()}`;
	return (
		<html {...props.htmlAttributes}>
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
					href={`/styles/css/datePicker.css?v=${v_key}`}
				/>
				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{props.preBodyComponents}
				<div
					key={`body`}
					id="___gatsby"
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
				{props.postBodyComponents}
			</body>
		</html>
	);
}

HTML.propTypes = {
	htmlAttributes: PropTypes.object,
	headComponents: PropTypes.array,
	bodyAttributes: PropTypes.object,
	preBodyComponents: PropTypes.array,
	body: PropTypes.string,
	postBodyComponents: PropTypes.array
};
