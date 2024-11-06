import path from "../../router";
import { defEventIcon, defEventPeriod, showEventIcon } from "./eventIcon";

export const defLeftMenu = {
	Cashier: {
		displayKey: "lbl_Cashier",
		subMenu: {
			deposit: {
				path: path.deposit.root,
				displayKey: "lbl_Deposit"
			},
			// transferFunds: {
			// 	path: path.transferFunds.root,
			// 	displayKey: "lbl_TransferFunds"
			// },
			withdrawal: {
				path: path.withdrawal.root,
				displayKey: "lbl_Withdrawal"
			}
		}
	},
	History: {
		displayKey: "lbl_History",
		subMenu: {
			depositHistory: {
				path: path.depositHistory.root,
				displayKey: "lbl_DepositHistory"
			},
			// transferHistory: {
			// 	path: path.transferHistory.root,
			// 	displayKey: "lbl_TransferHistory"
			// },
			withdrawalHistory: {
				path: path.withdrawalHistory.root,
				displayKey: "lbl_WithdrawalHistory"
			},
			referralHistory: {
				path: path.referralHistory.root,
				displayKey: "lbl_ReferralHistory",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.referral
					})
				]
			},
			financial: {
				path: path.financial.root,
				displayKey: "lbl_FinancialLog"
			},
			statement: {
				path: `${path.statement.root}/${path.statement.sub.quickPick.root}`,
				displayKey: "lbl_Statement"
			}
		}
	},
	MyAccount: {
		displayKey: "lbl_MyAccount",
		subMenu: {
			profile: {
				path: path.profile.root,
				displayKey: "lbl_Profile"
			},
			bankInfo: {
				path: path.bankInfo.root,
				displayKey: "lbl_BankInfo"
			},
			cryptoWallet: {
				path: path.cryptoWallet.root,
				displayKey: "lbl_CryptoWallet"
			},
			referral: {
				path: path.referral.root,
				displayKey: "lbl_ReferFriends",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.referral
					})
				]
			},
			setting: {
				path: path.setting.root,
				displayKey: "lbl_Setting"
			}
		}
	},
	Message: {
		displayKey: "lbl_Message",
		subMenu: {
			message: {
				path: path.message.root,
				displayKey: "lbl_PersonalMsg"
			},
			announcement: {
				path: path.announcement.root,
				displayKey: "lbl_Announcement"
			}
		}
	}
};
