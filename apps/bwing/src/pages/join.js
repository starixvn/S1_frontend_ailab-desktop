import React, { useContext } from "react";
import { MultiCaptchaProvider } from "@ailab-desktop/common";
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
					<MultiCaptchaProvider langId={userInfo?.langId}>
						<Join />
					</MultiCaptchaProvider>
				</main>
			</Layout>
		</Wrapper>
	);
};
