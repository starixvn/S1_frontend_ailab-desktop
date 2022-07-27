import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { api_shield_GetEndpoint } from "../../service/api/shield";
import useShieldCheck from "../hook/useShieldCheck";

function ThirdPartyJS() {
	return (
		<>
			<Helmet />
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

export default ThirdPartyJS;
