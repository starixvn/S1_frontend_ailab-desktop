/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import config from "../../config";

function ThirdPartyJS() {
	const [mountGTM, setMountGTM] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			setMountGTM(true);
		}
	}, []);

	return (
		<>
			<Helmet />
			{mountGTM && <GTM gtmCode="GTM-5VD4484" />}
			{/* <GATag gaCode="UA-163834722-1" /> */}
			<LiveChat />
			<Iovation />
			{/* <FPS /> */}
			<PlayTech />
		</>
	);
}

const LiveChat = () => (
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

const GATag = ({ gaCode }) => (
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

const Iovation = () => (
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
			src={`${config.openURL}/common/js/loader_only.js?v=201027`}
			type="text/javascript"
		/>
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
			src="https://login-am.cat87666.com/jswrapper/hotspin88am/integration.js"
			type="text/javascript"
		/>
	</Helmet>
);

const GTM = ({ gtmCode }) => (
	<Helmet>
		<script>
			{`
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-5VD4484');
		`}
		</script>

		<script>
			{`  window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-B22CGGG5KJ');`}
		</script>
	</Helmet>
);

export default ThirdPartyJS;
