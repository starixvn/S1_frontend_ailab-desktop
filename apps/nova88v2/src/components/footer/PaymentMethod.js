import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { GetCurrencyName } from "../common/common";
import { PAYMENT_LIST } from "./def";
import { userInfoContext } from "../common/context";

const PaymentMethod = () => {
	const { t } = useTranslation();
	const {
		userInfo: { langId, currencyId }
	} = useContext(userInfoContext);

	// 避免KHR的英文網站去吃到USD的Footer圖片
	const paymentList =
		currencyId === 72
			? PAYMENT_LIST.KHR
			: PAYMENT_LIST[GetCurrencyName({ langId, currencyId, t })] ??
			  PAYMENT_LIST.MYR;

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
