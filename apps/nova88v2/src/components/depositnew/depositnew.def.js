export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank",
	cryptoPay: "Crypto Pay"
};

export const defDepositOptions = ({
	mobilePayGourpList = [],
	localBankGroupList = [],
	onlineBankGroupList = [],
	cryptoPayGroupList = []
}) => [
	{
		type: defDepositType.onlineBank,
		isHide: !onlineBankGroupList.length,
		depositDisplaykey: "lbl_OnlineBanking",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	},
	{
		type: defDepositType.localBank,
		depositDisplaykey: "lbl_WireTransfers",
		isHide: !localBankGroupList.length,
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.mobile,
		isHide: !mobilePayGourpList.length,
		depositDisplaykey: "lbl_MobileDeposit",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-mobile"
	},
	{
		type: defDepositType.cryptoPay,
		depositDisplaykey: "lbl_CryptoPay",
		isHide: !cryptoPayGroupList.length,
		creditTime: "lbl_Instant",
		iconClass: "icon icon-USDT"
	}
];

export const defDepositChannelIdList = {
	OnlineBanking: 1,
	CashDepositMachine: 2,
	ATM: 3,
	OverTheCounter: 4
};

export const defDepositChannel = [
	{
		displayKey: "lbl_DepositChannel_1",
		id: defDepositChannelIdList.OnlineBanking
	},
	{
		displayKey: "lbl_DepositChannel_2",
		id: defDepositChannelIdList.CashDepositMachine
	},
	{
		displayKey: "lbl_DepositChannel_3",
		id: defDepositChannelIdList.ATM
	},
	{
		displayKey: "lbl_DepositChannel_4",
		id: defDepositChannelIdList.OverTheCounter
	}
];
