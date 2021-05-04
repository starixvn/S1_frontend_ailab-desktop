export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank",
	loadCard: "TopUp Mobile"
};

export const defDepositOptions = ({
	mobilePayGourpList = [],
	localBankGroupList = [],
	onlineBankGroupList = [],
	loadCardPayGroupList = []
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
		isHide: !localBankGroupList.length,
		depositDisplaykey: "lbl_WireTransfers",
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.onlineBank,
		isHide: !onlineBankGroupList.length,
		depositDisplaykey: "lbl_OnlineBanking",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	},
	{
		type: defDepositType.loadCard,
		isHide: !loadCardPayGroupList.length,
		depositDisplaykey: "lbl_TopUpCard",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-topup"
	}
];
