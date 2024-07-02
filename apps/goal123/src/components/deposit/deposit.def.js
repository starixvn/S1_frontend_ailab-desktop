export const defDepositType = {
	mobile: "Mobile E-Wallet",
	localBank: "Local Bank",
	onlineBank: "Online Bank",
	loadCard: "TopUp Mobile",
	cryptoPay: "Crypto Pay",
	QRPay: "QR Pay",
	quickTransfer: "Quick Transfer"
};

export const defDepositOptions = ({
	mobilePayGourpList = [],
	localBankGroupList = [],
	autoChannelBankGroupList = [],
	loadCardPayGroupList = [],
	cryptoPayGroupList = [],
	QRPayGroupList = [],
	quickTransferGroupList = []
}) => [
	{
		type: defDepositType.localBank,
		isHide: !localBankGroupList.length,
		depositDisplaykey: "lbl_WireTransfers",
		creditTime: "lbl_5mins",
		iconClass: "icon icon-library"
	},
	{
		type: defDepositType.quickTransfer,
		isHide: !quickTransferGroupList.length,
		depositDisplaykey: "lbl_DepositType9",
		creditTime: "lbl_Instant",
		iconClass: "icon-quick"
	},
	{
		type: defDepositType.QRPay,
		depositDisplaykey: "lbl_QRPay",
		isHide: !QRPayGroupList.length,
		creditTime: "lbl_Instant",
		iconClass: "icon icon-qrcode-scan"
	},
	{
		type: defDepositType.onlineBank,
		isHide: !autoChannelBankGroupList.length,
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
		type: defDepositType.loadCard,
		isHide: !loadCardPayGroupList.length,
		depositDisplaykey: "lbl_TopUpCard",
		creditTime: "lbl_Instant",
		iconClass: "icon icon-topup"
	}
];
