/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import config from "../../config";
import Favicon from "../../styles/img/favicon.ico";
import { defMetaData } from "./def";
import { defLangList } from "../../datas/languageData";

function SEO({ description, lang, meta, title }) {
	const location = useLocation()
		?.pathname?.split("/")
		.filter(p => p !== "");

	let metaData = defMetaData["/"];
	let _title = metaData?.[lang]?.title ?? "";
	let _keyword = metaData?.[lang]?.keyword ?? "";
	let _description = metaData?.[lang]?.description ?? "";
	let links = metaData?.[lang]?.links ?? [];
	if (
		location.length >= 2 &&
		defLangList.includes(location[0]) &&
		defMetaData[location[1]]
	) {
		metaData = defMetaData[location[1]] ?? metaData;
		_title = defMetaData[location[1]]?.[lang]?.title ?? _title;

		_keyword = defMetaData[location[1]]?.[lang]?.keyword ?? _keyword;

		_description =
			defMetaData[location[1]]?.[lang]?.description ?? _description;

		links = defMetaData[location[1]]?.[lang]?.links ?? links;
	}

	return (
		<>
			<Helmet
				htmlAttributes={{
					lang,
					class: "newIndex"
				}}
				title={_title}
				link={[
					...links,
					{ rel: "icon", type: "image/x-icon", href: `${Favicon}` }
				]}
				meta={[
					{
						name: `description`,
						content: _description
					},
					{
						name: `keyword`,
						content: _keyword
					},
					{
						property: `og:title`,
						content: _title
					},
					{
						property: `og:description`,
						content: _description
					},
					{
						property: `og:type`,
						content: `website`
					},
					{
						name: `twitter:card`,
						content: `summary`
					},
					{
						name: `twitter:creator`,
						content: _title
					},
					{
						name: `twitter:title`,
						content: _title
					},
					{
						name: `twitter:description`,
						content: _description
					}
				].concat(meta)}
			/>
			<GATag gaCode="UA-163834722-1" />
			<LiveChat />
			<Iovation />
			{/* <FPS /> */}
			<PlayTech />
		</>
	);
}

SEO.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
	title: ""
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string
};

const LiveChat = () => {
	return (
		<Helmet>
			<script>
				{`window.__lc = window.__lc || {};
        window.__lc.license = 11638088;
        window.__lc.chat_between_groups = false;
        ; (function (n, t, c) { function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) } var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } }; !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e }(window, document, [].slice))
        `}
			</script>
		</Helmet>
	);
};

const GATag = ({ gaCode }) => {
	return (
		<Helmet>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${gaCode}`}
			/>
			<script>
				{`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', '${gaCode}');`}
			</script>
		</Helmet>
	);
};

const Iovation = () => {
	return (
		<Helmet>
			<script>
				{`
				   	window.IGLOO = window.IGLOO || {
						"enable_flash" : false,
						"loader" : {
						"fp_dyn" : false,
						"version" : "5.2.2"
						}
				  	};
				`}
			</script>
			<script
				src={`${config.t_and_cURL}/common/js/loader_only.js?v=201027`}
				type="text/javascript"
			/>
		</Helmet>
	);
};

// const FPS = () => {
// 	return (
// 		<Helmet>
// 			<script
// 				async=""
// 				defer=""
// 				src="//sc.detecas.com/di/activator.ashx"
// 			/>
// 		</Helmet>
// 	);
// };

const PlayTech = () => {
	return (
		<Helmet>
			<script
				src="https://login-am.hotspin88.com/jswrapper/hotspin88am/integration.js"
				type="text/javascript"
			/>
		</Helmet>
	);
};

export default SEO;
