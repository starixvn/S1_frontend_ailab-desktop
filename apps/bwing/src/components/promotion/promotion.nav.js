import React from "react";
import { defPromotionType } from "./promotion.def";

export const defFilterType = {
	all: 0,
	expiry: 999,
	firstDeposit: 1,
	redeposit: 2,
	freeBet: 3,
	Rebate_and_cashback: [defPromotionType.rebate, defPromotionType.cashback],
	special_bonus: defPromotionType.special_bonus
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
	{
		displayKey: "lbl_SpecialBonus",
		value: defFilterType.special_bonus,
		className: "blueBorder"
	},
	{
		displayKey: "lbl_Expired",
		value: defFilterType.expiry,
		className: "lightgray",
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
		let trim = string =>
			string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
		setSpecialCode(trim(e.target.value));
	};

	const onKeyPress = e => {
		if (e.key === "Enter") onSetSpecialCodeSubmit();
	};

	let defPromoNavsFormat = defPromoNavs.filter(
		item => item.value !== defFilterType.special_bonus || userInfo.isLogin
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
										: "blueGradient"
									: item.className
							}
							onClick={() => onClick(item.value)}>
							{t(item.displayKey).toUpperCase()}
						</button>
					))}
				</div>
			</div>

			{selected === defFilterType.special_bonus ? (
				<div className="specialBonus">
					<div className="inputBox-blue">
						<input
							value={specialCode}
							onKeyPress={onKeyPress}
							placeholder={t("lbl_SpecialBonusCode")}
							onChange={onChangeSpecialCode}
						/>
					</div>
					<div className="btnGroup">
						<button
							className="orange"
							onClick={onSetSpecialCodeSubmit}>
							{t("lbl_Submit")}
						</button>
					</div>
				</div>
			) : null}
		</>
	);
};
