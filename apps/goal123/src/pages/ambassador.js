/* eslint-disable no-unreachable */
import React, { useEffect } from "react";
import { navigate } from "gatsby";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import AmbassadorContent from "../components/ambassador/index";
import HomeFooter from "../components/footer/HomeFooter";

const Ambassador = () => {
	// 因應 pm 需求此頁暫時關閉
	useEffect(() => {
		navigate("/");
	}, []);

	return (
		<Wrapper>
			<Layout>
				<AmbassadorContent />
				<HomeFooter />
			</Layout>
		</Wrapper>
	);
};

export default Ambassador;
