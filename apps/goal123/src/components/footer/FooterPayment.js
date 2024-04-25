import React from "react";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const FooterPayment = () => {
	const { t } = useTranslation();
	const paymentMethods = [
		{ id: "acb", name: "ACB" },
		{ id: "bidv", name: "BIDV" },
		{ id: "dab", name: "DAB" },
		{ id: "exim", name: "EXIM" },
		{ id: "hdb", name: "HDB" },
		{ id: "mb", name: "MB" },
		{ id: "momo", name: "MOMO" },
		{ id: "msb", name: "MSB" },
		{ id: "sacom", name: "SACOM" },
		{ id: "tcb", name: "TCB" },
		{ id: "vcb", name: "VCB" },
		{ id: "vib", name: "VIB" },
		{ id: "vtb", name: "VTB" },
		{ id: "zalo", name: "ZALO PAY" }
	];

	return (
		<div className="payment-content">
			<div className="title">{t("lbl_PaymentMethods")}</div>
			<div>
				{paymentMethods.map(method => (
					<a
						key={method.id}
						onClick={e => e.preventDefault()}
						style={{ cursor: "default" }}>
						<img
							src={`${bannerImgUrl}/desktop/img/home-page/payment/${method.id}.jpg`}
							alt={method.name}
						/>
					</a>
				))}
			</div>
		</div>
	);
};

export default FooterPayment;
