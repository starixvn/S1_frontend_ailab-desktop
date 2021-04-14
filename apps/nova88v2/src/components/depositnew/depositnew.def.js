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
		type: defDepositType.mobile,
		depositDisplaykey: "lbl_MobileDeposit",
		isHide: !mobilePayGourpList.length,
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
		depositDisplaykey: "lbl_OnlineBanking",
		isHide: !onlineBankGroupList.length,
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	},
	{
		type: defDepositType.cryptoPay,
		depositDisplaykey: "lbl_CryptoPay",
		isHide: !cryptoPayGroupList.length,
		creditTime: "lbl_Instant",
		iconClass: "icon icon-connection"
	}
];
