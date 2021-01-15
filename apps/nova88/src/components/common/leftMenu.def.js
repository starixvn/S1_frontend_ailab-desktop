import path from "../../router";
import {
	defIconType,
	defEventPeriod,
	showPeriodIcon
} from "../../components/common/defEventIcon";

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
			transferHistory: {
				path: path.transferHistory.root,
				displayKey: "lbl_TransferHistory"
			},
			withdrawalHistory: {
				path: path.withdrawalHistory.root,
				displayKey: "lbl_WithdrawalHistory"
			},
			financial: {
				path: path.financial.root,
				displayKey: "lbl_Financial"
			},
			referralHistory: {
				path: path.referralHistory.root,
				displayKey: "lbl_ReferralHistory",
				periodIcons: [
					showPeriodIcon({
						icon: defIconType.new,
						period: defEventPeriod.referral
					})
				]
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
			referral: {
				path: path.referral.root,
				displayKey: "lbl_ReferFriends",
				periodIcons: [
					showPeriodIcon({
						icon: defIconType.new,
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
