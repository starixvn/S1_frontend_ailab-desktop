import React, { useContext } from "react";
import { userInfoContext } from "../common/context";
import { langAndCurrMapping } from "../common/common";
import useGetSocialChannel, {
	defDisplayPage
} from "../hook/useGetSocialChannel";
import About from "./About";
import PaymentMethod from "./PaymentMethod";
import License from "./License";
import PromotionText from "./PromotionText";
import SuggestBrowser from "./SuggestBorwser";

const Footer = () => {
	const {
		userInfo: { currencyId, langId }
	} = useContext(userInfoContext);

	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId: currencyId ?? langAndCurrMapping[langId],
		displayPage: defDisplayPage.Footer
	});

	return (
		<footer id="footer">
			<About socialChannel={socialChannel} />
			<div className="footer-center">
				<License />
				<SuggestBrowser />
				<PaymentMethod />
			</div>
			<div className="copyright">{`© Copyright ${new Date().getFullYear()}. Nova88. All Rights Reserved. 18+`}</div>
			<PromotionText />
		</footer>
	);
};

export default Footer;
