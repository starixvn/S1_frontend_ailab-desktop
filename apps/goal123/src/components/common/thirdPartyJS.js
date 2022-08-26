import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { api_shield_GetEndpoint } from "../../service/api/shield";
import useShieldCheck from "../hook/useShieldCheck";

function ThirdPartyJS() {
	return (
		<>
			<Helmet />
			<GTM />
			<Shield />
		</>
	);
}

const Shield = () => {
	const { getShieldData } = useShieldCheck();
	const [endpoint, setEndpoint] = useState("");

	useEffect(() => {
		api_shield_GetEndpoint().then(res => {
			const { errorCode, data } = res.data;
			if (errorCode === 0) {
				const _endpoint = data?.endpoint;
				setEndpoint(_endpoint);
			}
		});
	}, []);

	return (
		<Helmet>
			<script
				language="javascript"
				src="https://d1cr9zxt7u0sgu.cloudfront.net/shdfp.js?SITE_ID=1bb2dfee53937052b49ec5a57cd755319675209b&TYPE=JS&DE=1&AUTO=0"
				type="text/javascript"
				async
				charSet="UTF-8"
				onLoad={getShieldData}
			/>
			(
			<noscript>
				{`<iframe
					src="${endpoint}/shield-fp/v1/api/web/noscript?site_id=1bb2dfee53937052b49ec5a57cd755319675209b"
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
		<script>
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
			})(window, document, "script", "dataLayer", "GTM-TV88KQ6")`}
		</script>

		{/* <!-- Google tag (gtag.js) --> */}
		<script
			async
			src="https://www.googletagmanager.com/gtag/js?id=G-BJS34RMDR8"
		/>
		<script>
			{`  window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'G-BJS34RMDR8');`}
		</script>
	</Helmet>
);

export default ThirdPartyJS;
