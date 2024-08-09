/* eslint-disable react/no-unknown-property */
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

				{/* === Facebook Pixel - 存／提款成功事件 === */}

				<script
					dangerouslySetInnerHTML={{
						__html: `
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', '1494348037871204');
						fbq('track', 'PageView');
						`
					}}
				/>
				<noscript>
					<img
						alt=""
						height="1"
						width="1"
						style={{ display: "none" }}
						src="https://www.facebook.com/tr?id=1494348037871204&ev=PageView&noscript=1"
					/>
				</noscript>

				{/* ==================================== */}

				{/* <script type="text/javascript" src="/lib/jquery-3.6.0.min.js" /> */}

				{/* shield */}
				<script
					language="javascript"
					src="https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=1bb2dfee53937052b49ec5a57cd755319675209b&TYPE=JS&DE=1&AUTO=0"
					type="text/javascript"
					async
					charSet="UTF-8"
				/>
				{/* shield */}

				{props.headComponents}
			</head>
			<body {...props.bodyAttributes}>
				{/* <!-- Google Tag Manager (noscript) --> */}
				<noscript>
					<iframe
						title="GTM"
						src="https://www.googletagmanager.com/ns.html?id=GTM-TV88KQ6"
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
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: props.body }}
				/>
				{props.postBodyComponents}
			</body>
			<footer>
				<script
					async=""
					defer=""
					src="//sc.detecas.com/di/activator.ashx"
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
