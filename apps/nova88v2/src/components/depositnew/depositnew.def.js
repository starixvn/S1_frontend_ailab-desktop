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

export const defDepChannelIdList = {
	OnlineBanking: 1,
	CashDepositMachine: 2,
	ATM: 3,
	OverTheCounter: 4
};

export const defDepositChannel = [
	{
		displayKey: "lbl_DepositChannel_1",
		id: defDepChannelIdList.OnlineBanking
	},
	{
		displayKey: "lbl_DepositChannel_2",
		id: defDepChannelIdList.CashDepositMachine
	},
	{ displayKey: "lbl_DepositChannel_3", value: defDepChannelIdList.ATM },
	{
		displayKey: "lbl_DepositChannel_4",
		id: defDepChannelIdList.OverTheCounter
	}
];
