/* eslint-disable react/jsx-curly-brace-presence */
import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import { bannerImgUrl } from "../config";
import path from "../router";

const defHrefLang = {
	en: "en-us",
	vn: "vi-vn"
};

const query = graphql`
	query {
		site {
			siteMetadata {
				title
				description
				author
				supportedLanguages
			}
		}
	}
`;

function SEO({ description, lang, meta, title }) {
	const { href } = useLocation();
	const { site } = useStaticQuery(query);

	const metaDescription = description || site.siteMetadata.description;

	const splitPath =
		// eslint-disable-next-line valid-typeof
		typeof window !== undefined && window.location.pathname.split("/");

	const htmlClassName = () => {
		// 應該只有首頁，不確定還有沒其他頁面會符合這邏輯，是從 2020 年的邏輯搬過來的
		if (
			// eslint-disable-next-line valid-typeof
			typeof window !== undefined &&
			(window.location.pathname === "/" ||
				((splitPath.length === 2 ||
					(splitPath.length === 3 && splitPath[2] === "")) &&
					site.siteMetadata.supportedLanguages.includes(
						splitPath[1]
					)))
		) {
			return "index Newtheme";
		}
		// leaderboard 頁面
		if (
			// eslint-disable-next-line valid-typeof
			typeof window !== undefined &&
			splitPath[2] === path.leaderBoard.root
		) {
			return "Newtheme leaderboard";
		}

		return "Newtheme lobby";
	};

	return (
		<>
			<Helmet
				htmlAttributes={{
					lang,
					class: htmlClassName()
				}}
				title={site.siteMetadata.title}
				link={[
					{
						rel: "alternate",
						href,
						hrefLang: defHrefLang[lang]
					},
					{
						rel: "icon",
						type: "image/png",
						href: `${bannerImgUrl}/desktop/img/favicon.ico`
					}
				]}
				meta={[
					{
						name: `description`,
						content: metaDescription
					},
					{
						property: `og:title`,
						content: title
					},
					{
						property: `og:description`,
						content: metaDescription
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
						content: site.siteMetadata.author
					},
					{
						name: `twitter:title`,
						content: title
					},
					{
						name: `twitter:description`,
						content: metaDescription
					}
				].concat(meta)}
			/>
			{/* <GATag gaCode="UA-163812389-1" /> */}
			<FBPixelCode />
			<LiveChat />
			{/* <FPS /> */}
			<PlayTech />
		</>
	);
}

const LiveChat = () => (
	<>
		<Helmet>
			<script async>
				{`window.__lc = window.__lc || {};
				window.__lc.license = 12171870;
				window.__lc.chat_between_groups = false;
				;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))`}
			</script>
		</Helmet>
		<Helmet>
			<noscript>
				{`<a
						href="https://www.livechatinc.com/chat-with/12171870/"
						rel="nofollow">
						Chat with us
					</a>
					, powered by{" "}
					<a
						href="https://www.livechatinc.com/?welcome"
						rel="noopener nofollow"
						target="_blank">
						LiveChat
					</a>`}
			</noscript>
		</Helmet>
	</>
);

// const GATag = ({ gaCode }) => (
// 	<Helmet>
// 		<script
// 			async
// 			src={`https://www.googletagmanager.com/gtag/js?id=${gaCode}`}
// 		/>
// 		<script async>
// 			{`window.dataLayer = window.dataLayer || [];
// 					function gtag(){dataLayer.push(arguments);}
// 					gtag('js', new Date());

// 					gtag('config', '${gaCode}');`}
// 		</script>
// 	</Helmet>
// );

const FBPixelCode = () => (
	<Helmet>
		<script>
			{`
					!function(f,b,e,v,n,t,s)
					{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};
					if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
					n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];
					s.parentNode.insertBefore(t,s)}(window, document,'script',
					'https://connect.facebook.net/en_US/fbevents.js');
					fbq('init', '1012937295810473');
					fbq('track', 'PageView');
				`}
		</script>
		<noscript>
			{`<img height="1" width="1" style="display:none"
					  src="https://www.facebook.com/tr?id=1012937295810473&ev=PageView&noscript=1"
					/>`}
		</noscript>
		<script>{`fbq("track", "CompleteRegistration")`}</script>
	</Helmet>
);

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

const PlayTech = () => (
	<Helmet>
		<script
			async
			src="https://login-am.htsp123.com/jswrapper/hotspin88am/integration.js"
			type="text/javascript"
		/>
	</Helmet>
);

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

export default SEO;
