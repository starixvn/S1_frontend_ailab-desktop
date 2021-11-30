import React from "react";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Content from "../components/promotion/promotion";
import PromotionWrapper from "../components/promotion/promotion.wrapper";

export default () => {
	return (
		<Wrapper>
			<PromotionWrapper>
				<Layout showFooter={true}>
					<main>
						<section className="inside">
							<div className="rightModule">
								<Content />
							</div>
						</section>
					</main>
				</Layout>
			</PromotionWrapper>
		</Wrapper>
	);
};
