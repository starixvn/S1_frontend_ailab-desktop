import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import RebateExclude from "../components/rebateExclude";

export default () => {
	return (
		<Wrapper>
			<Layout showHeader={false}>
				<div className="subheader">
					<div className="subheader__container">
						<a href="https://www.goal123.com/" />
					</div>
				</div>
				<main className="exclude">
					<RebateExclude />
				</main>
				<div className="subcopyright">
					<span className="text">{`© Copyright ${new Date().getFullYear()}. Goal123. All Rights Reserved.`}</span>
				</div>
			</Layout>
		</Wrapper>
	);
};
