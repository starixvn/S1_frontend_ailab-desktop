import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import config from "../../config";
import { api_shield_GetEndpoint } from "../../service/api/shield";
import useShieldCheck from "../hook/useShieldCheck";

const SHIELD_SITE_ID = "b5626627447a18bbf8cab1510a2c59cda2442fa2";

function ThirdPartyJS() {
	return (
		<>
			<Helmet />
			<GTM />
			<Shield />
			<YuriTrack />
		</>
	);
}

const Shield = () => {
	const { getShieldData } = useShieldCheck();
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		// 確保只 call 一次 api 取得 endpoint
		if (!endpoint) {
			api_shield_GetEndpoint({ siteId: config.siteId }).then(res => {
				const { errorCode, data } = res.data;
				if (errorCode === 0) {
					const _endpoint = data?.endpoint;
					setEndpoint(_endpoint);
				}
			});
		}
	}, []);

	return (
		<Helmet>
			<script
				language="javascript"
				src={`https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=${SHIELD_SITE_ID}&TYPE=JS&DE=1&AUTO=0`}
				type="text/javascript"
				async
				// eslint-disable-next-line react/no-unknown-property
				charset="UTF-8"
				onLoad={getShieldData}
			/>
			(
			<noscript>
				{`<iframe
					src="${endpoint}/shield-fp/v1/api/web/noscript?site_id=${SHIELD_SITE_ID}"
					width="0"
					height="0"
					style="display:none"
				/>`}
			</noscript>
			)
		</Helmet>
	);
};

const GTM = () => (
	<Helmet>
		<script async>
			{`(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					"gtm.start": new Date().getTime(),
					event: "gtm.js"
				});
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != "dataLayer" ? "&l=" + l : "";
					j.async = true;
					j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
					f.parentNode.insertBefore(j, f);
			})(window, document, "script", "dataLayer", "GTM-NKP2DBN")`}
		</script>

		{/* <!-- Google tag (gtag.js) --> */}
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id=G-V0NSTJVY5J"
		/>
		<script async>
			{`window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', 'G-V0NSTJVY5J');`}
		</script>
	</Helmet>
);

// 市場要埋的追蹤碼
const YuriTrack = () => (
	<Helmet>
		<script async>
			{`!function(y,u,r,i){y._yuri_track||((n=y._yuri_track=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)}).queue=n.queue||[],y._yuri_track._fp||(y._yuri_track._fp=1,t=u.createElement(r),s=u.getElementsByTagName(r)[0],t.async=1,t.src=i,s.parentNode.insertBefore(t,s)))}(window,document,"script","https://cdn.jsdelivr.net/gh/adzon/assets/pixel.js?_rid={click_id}");`}
		</script>
	</Helmet>
);

export default ThirdPartyJS;
