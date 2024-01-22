import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { PAYMENT_LIST } from "./footer.def";

const PaymentMethod = () => {
	const { t } = useTranslation();
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);

	const paymentList = PAYMENT_LIST[currencyId || 2];

	return (
		<div className="footer-center-item payment">
			<div className="footer-center-title">{t("lbl_Payment_Method")}</div>
			<div className="footer-icon">
				{paymentList.map(({ name, img }) => (
					<a key={name}>
						<img src={img} alt={name} />
					</a>
				))}
			</div>
		</div>
	);
};

export default PaymentMethod;
