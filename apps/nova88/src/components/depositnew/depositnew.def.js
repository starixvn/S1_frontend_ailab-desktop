export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank"
};

export const defDepositOptions = ({
	mobilePayGourpList = [],
	localBankGroupList = [],
	onlineBankGroupList = []
}) => [
	{
		type: defDepositType.mobile,
		isHide: !mobilePayGourpList.length,
		depositDisplaykey: "lbl_MobileDeposit",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-mobile"
	},
	{
		type: defDepositType.localBank,
		depositDisplaykey: "lbl_WireTransfers",
		isHide: !localBankGroupList.length,
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.onlineBank,
		isHide: !onlineBankGroupList.length,
		depositDisplaykey: "lbl_OnlineBanking",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	}
];
