import React, { useContext } from "react";
import { GReCaptchaProviders } from "@ailab-desktop/common";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Content from "../components/join/join";
import { userInfoContext } from "../components/common/context";

export default () => {
	const { userInfo } = useContext(userInfoContext);

	return (
		<Wrapper onlyBeforeLogin={true}>
			<Layout>
				<main className="joinlogin">
					<GReCaptchaProviders langId={userInfo?.langId}>
						<Content />
						{/* 控制位置在 GoogleReCaptchaProvider */}
						<div id="g-reCaptcha" />
					</GReCaptchaProviders>
				</main>
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};
