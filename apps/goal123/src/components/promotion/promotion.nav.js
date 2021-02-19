import React from "react";
import { defPromotionType } from "./promotion.def";

export const defFilterType = {
	all: 0,
	expiry: 999,
	firstDeposit: defPromotionType.firstDeposit,
	redeposit: defPromotionType.redeposit,
	freeBet: defPromotionType.freeBet,
	Rebate_and_cashback: [defPromotionType.rebate, defPromotionType.cashback],
	specialBonus: defPromotionType.specialBonus
};

const defPromoNavs = [
	{
		displayKey: "lbl_All",
		value: defFilterType.all,
		className: "blueBorder"
	},
	{
		displayKey: "PromotionCategory1",
		value: defFilterType.firstDeposit,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_FreeBet",
		value: defFilterType.freeBet,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_PromotionRebateAndCashback",
		value: defFilterType.Rebate_and_cashback,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Redeposit_Promo",
		value: defFilterType.redeposit,
		className: "blueBorder"
	},
	// {
	// 	displayKey: "lbl_SpecialBonus",
	// 	value: defFilterType.specialBonus,
	// 	className: "blueBorder"
	// },
	{
		displayKey: "lbl_Expired",
		value: defFilterType.expiry,
		className: "orange",
		selectedClass: "red"
	}
];

export default ({
	t,
	userInfo,
	selected,
	onClick,
	specialCode,
	setSpecialCode,
	onSetSpecialCodeSubmit
}) => {
	const onChangeSpecialCode = e => {
		const trim = string =>
			string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		setSpecialCode(trim(e.target.value));
	};

	const onKeyPress = e => {
		if (e.key === "Enter") onSetSpecialCodeSubmit();
	};

	const defPromoNavsFormat = defPromoNavs.filter(
		item => item.value !== defFilterType.specialBonus || userInfo.isLogin
	);

	return (
		<>
			<div className="quickSelect">
				<div className="btnGroup promoType">
					{defPromoNavsFormat.map(item => (
						<button
							key={`promo-nav-${item.displayKey}`}
							className={
								item.value === selected
									? item.selectedClass
										? item.selectedClass
										: "btn-check"
									: item.className
							}
							onClick={() => onClick(item.value)}>
							{t(item.displayKey)}
						</button>
					))}
				</div>
			</div>

			{selected === defFilterType.specialBonus ? (
				<div className="specialBonus">
					<div className="inputBox-white">
						<input
							value={specialCode}
							onKeyPress={onKeyPress}
							placeholder={t("lbl_SpecialBonusCode")}
							onChange={onChangeSpecialCode}
						/>
					</div>
					<div className="btnGroup">
						<button
							className="red"
							onClick={onSetSpecialCodeSubmit}>
							{t("lbl_Submit")}
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};
