export const DepositTypeEnum = {
	OnlineBanking: 1,
	MobilePayment: 2,
	BankTransfer: 3,
	CryptoPay: 4,
	TopUpCard: 5,
	QRPay: 6,
	BankAutoChannel: 7,
	CryptoWallet: 8,
	QuickTransfer: 9,
	ChatTransfer: 10
};

export const AllowUploadReceiptType = [
	DepositTypeEnum.BankTransfer,
	DepositTypeEnum.OnlineBanking,
	DepositTypeEnum.QuickTransfer,
	DepositTypeEnum.CryptoPay,
	DepositTypeEnum.CryptoWallet,
	DepositTypeEnum.MobilePayment
];

// 只有 BankTransfer 才有銀行相關資料需要顯示 (goal 發現目前沒有顯示，所以只有 bwing 需要)
export const WithReceiptInfoType = [DepositTypeEnum.BankTransfer];
