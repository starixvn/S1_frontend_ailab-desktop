import React, { useContext } from "react";
import { GReCaptchaProviders } from "@ailab-desktop/common";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Join from "../components/join/join";
import { userInfoContext } from "../components/common/context";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<GReCaptchaProviders langId={userInfo?.langId}>
						<Join />
						{/* 控制位置在 GoogleReCaptchaProvider */}
						<div id="g-reCaptcha" />
					</GReCaptchaProviders>
				</main>
			</Layout>
		</Wrapper>
	);
};
