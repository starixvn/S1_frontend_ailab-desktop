export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank"
};

export const defDepositOption = [
	{
		type: defDepositType.mobile,
		depositDisplaykey: "lbl_MobileDeposit",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-mobile"
	},
	{
		type: defDepositType.localBank,
		depositDisplaykey: "lbl_WireTransfers",
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.onlineBank,
		depositDisplaykey: "lbl_OnlineBanking",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	}
];
