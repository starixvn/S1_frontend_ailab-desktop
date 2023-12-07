export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank",
	cryptoPay: "Crypto Pay",
	QRPay: "QR Pay",
	autoDeposit: "Auto Deposit",
	linePay: "Line Pay",
	loadCard: "TopUp Mobile",
	quickTransfer: "Quick Transfer"
};

export const defDepositOptions = ({
	autoDepositGroupList = [],
	mobilePayGourpList = [],
	localBankGroupList = [],
	onlineBankGroupList = [],
	cryptoPayGroupList = [],
	QRPayGroupList = [],
	loadCardPayGroupList = [],
	quickTransferGroupList = [],
	linePayLink
}) => [
	{
		type: defDepositType.autoDeposit,
		isHide: !autoDepositGroupList.length,
		depositDisplaykey: "lbl_AutoDeposit",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-library fast"
	},
	{
		type: defDepositType.localBank,
		depositDisplaykey: "lbl_WireTransfers",
		isHide: !localBankGroupList.length,
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.linePay,
		depositDisplaykey: "lbl_LinePay",
		isHide: false,
		creditTime: "lbl_5mins",
		iconClass: "icon icon-line",
		linePayLink
	},
	{
		type: defDepositType.onlineBank,
		isHide: !onlineBankGroupList.length,
		depositDisplaykey: "lbl_OnlineBanking",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
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
	},
	{
		type: defDepositType.QRPay,
		depositDisplaykey: "lbl_QRPay",
		isHide: !QRPayGroupList.length,
		creditTime: "lbl_Instant",
		iconClass: "icon-qrpay"
	},
	{
		type: defDepositType.loadCard,
		isHide: !loadCardPayGroupList.length,
		depositDisplaykey: "lbl_TopUpCard",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-topup"
	},
	{
		type: defDepositType.quickTransfer,
		isHide: !quickTransferGroupList.length,
		depositDisplaykey: "lbl_DepositType9",
		creditTime: "lbl_Instant",
		iconClass: "icon-quick"
	}
];

export const defDepositChannelIdList = {
	OnlineBanking: 1,
	CashDepositMachine: 2,
	ATM: 3,
	OverTheCounter: 4,
	BankQR: 5
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
	},
	{
		displayKey: "lbl_DepositChannel_5",
		id: defDepositChannelIdList.BankQR
	}
];
