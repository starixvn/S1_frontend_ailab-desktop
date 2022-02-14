import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "@reach/router";

export default ({ step }) => {
	const { t } = useTranslation();
	const location = useLocation();

	const fourStepList = [
		{
			title: "01",
			description: t("lbl_SelectPaymentModes")
		},
		{
			title: "02",
			description: t("lbl_SelectBank")
		},
		{
			title: "03",
			description: t("lbl_EnterAmount")
		},
		{
			title: "OK",
			description: t("lbl_Confirm")
		}
	];

	const threeStepList = [
		{
			title: "01",
			description: t("lbl_SelectPaymentModes")
		},
		{
			title: "02",
			description: t("lbl_EnterAmount")
		},
		{
			title: "OK",
			description: t("lbl_Confirm")
		}
	];

	const defStepList =
		location.pathname.indexOf("cryptoPay") === -1
			? fourStepList
			: threeStepList;

	const rows = defStepList.map((s, sIdx) => {
		return (
			<div
				className={sIdx <= step - 1 ? "active" : ""}
				key={`deposit-step-${s.title}`}
			>
				<span>{s.title}</span>
				<span>{s.description}</span>
			</div>
		);
	});

	const percent = (step / defStepList.length) * 100;

	return (
		<div className="stepBar">
			<div className="stepLine" style={{ width: `${percent}%` }} />
			{rows}
		</div>
	);
};
