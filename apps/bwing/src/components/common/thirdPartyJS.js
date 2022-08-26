import React from "react";
import { Helmet } from "react-helmet";

function ThirdPartyJS() {
	return (
		<>
			<Helmet />
			<GTM gtmCode="GTM-5VD4484" />
		</>
	);
}

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
			})(window, document, "script", "dataLayer", "GTM-NKP2DBN")`}
		</script>
	</Helmet>
);

export default ThirdPartyJS;
