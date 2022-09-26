import path from "../../router";
import { defEventIcon, defEventPeriod, showEventIcon } from "./eventIcon";
import { defCurrencyList } from "./common";

export const defLeftMenu = {
	Cashier: {
		displayKey: "lbl_Cashier",
		subMenu: {
			deposit: {
				path: path.deposit.root,
				displayKey: "lbl_Deposit"
			},
			transferFunds: {
				path: path.transferFunds.root,
				displayKey: "lbl_TransferFunds"
			},
			withdrawal: {
				path: path.withdrawal.root,
				displayKey: "lbl_Withdrawal"
			},
			history: {
				path: path.history.root,
				displayKey: "lbl_History"
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
				displayKey: "lbl_BankInfo",
				allowCurrency: [
					defCurrencyList.MYR,
					defCurrencyList.THB,
					defCurrencyList.IDR,
					defCurrencyList.INR,
					defCurrencyList.CNY,
					defCurrencyList.BDT
				]
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
			changePassword: {
				path: path.changePassword.root,
				displayKey: "lbl_ChangePassword"
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
