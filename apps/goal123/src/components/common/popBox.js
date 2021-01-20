import React, { useContext, lazy, Suspense } from "react";
import { popBoxContext } from "./context";
import Loading from "./loading";

export const defPopBoxType = {
	Cancel: "Cancel",
	UploadBankSlip: "UploadBankSlip",
	Success: "Success",
	ErrorMsg: "ErrorMsg",
	Login: "Login",
	Join: "Join",
	AddBankAccount: "AddBankAccount",
	AddBankSuccess: "AddBankSuccess",
	ConfirmDelete: "ConfirmDelete",
	ProfileConfirmCheck: "ProfileConfirmCheck",
	ProfileCompelete: "ProfileCompelete",
	ChangePsw: "ChangePsw",
	LogoutHint: "LogoutHint",
	DepositHint: "DepositHint",
	OTPHint: "OTPHint",
	VerifyPhoneForm: "verifyPhoneForm",
	WithdrawalSuccess: "WithdrawalSuccess",
	UpdateProfile: "UpdateProfile",
	TurnoverAccumulated: "TurnoverAccumulated",
	PromotionDepositConfirm: "PromotionDepositConfirm",
	PromotionAmountConfirm: "PromotionAmountConfirm"
};

export default () => {
	const { popBox } = useContext(popBoxContext);
	let content = null;
	const Cancel = lazy(() => import("./popBox.cancel"));
	const { isOpen, ...restProps } = popBox;
	const UploadBankSlip = lazy(() => import("./popBox.uploadBankSlip"));
	const Success = lazy(() => import("./popBox.success"));
	const ErrorMsg = lazy(() => import("./popBox.errorMsg"));
	const Login = lazy(() => import("./popBox.login"));
	const Join = lazy(() => import("./popBox.join"));
	const AddBankAccount = lazy(() => import("./popBox.addBankAccount"));
	const AddBankSuccess = lazy(() => import("./popBox.addBankSuccess"));
	const ConfirmDelete = lazy(() => import("./popBox.confirmDelete"));
	const ProfileConfirmCheck = lazy(() =>
		import("./popBox.profileConfirmCheck")
	);
	const ProfileCompelete = lazy(() => import("./popBox.profileCompelete"));
	const ChangePsw = lazy(() => import("./popBox.changePsw"));
	const LogoutHint = lazy(() => import("./popBox.logoutHint"));
	const DepositHint = lazy(() => import("./popBox.depositHint"));
	const WithdrawalSuccess = lazy(() => import("./popBox.withdrawalSuccess"));
	const OTPHint = lazy(() => import("./popBox.otpHint"));
	const VerifyPhoneForm = lazy(() => import("./popBox.verifyPhoneForm"));
	const UpdateProfile = lazy(() => import("./popBox.updateProfile"));
	const TurnoverAccumulated = lazy(() =>
		import("./popBox.turnoverAccumulated")
	);
	const PromotionDepositConfirm = lazy(() =>
		import("./popBox.promotionDepositConfirm")
	);
	const PromotionAmountConfirm = lazy(() =>
		import("./popBox.promotionAmountConfirm")
	);

	switch (popBox.popBoxType) {
		case defPopBoxType.Cancel:
			content = <Cancel btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.UploadBankSlip:
			content = <UploadBankSlip {...restProps} />;
			break;

		case defPopBoxType.Success:
			content = <Success btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.ErrorMsg:
			content = (
				<ErrorMsg
					btnBar={popBox.btnBar}
					message={popBox.message}
					errorCode={popBox.errorCode}
					icon={popBox.icon}
				/>
			);
			break;

		case defPopBoxType.Login:
			content = <Login />;
			break;

		case defPopBoxType.Join:
			content = <Join />;
			break;

		case defPopBoxType.AddBankAccount:
			content = (
				<AddBankAccount bankInfoSysList={popBox.bankInfoSysList} />
			);
			break;

		case defPopBoxType.AddBankSuccess:
			content = <AddBankSuccess btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.ConfirmDelete:
			content = (
				<ConfirmDelete
					btnBar={popBox.btnBar}
					message={popBox.message}
					message2={popBox.message2}
				/>
			);
			break;

		case defPopBoxType.ProfileConfirmCheck:
			content = (
				<ProfileConfirmCheck
					btnBar={popBox.btnBar}
					accountName={popBox.accountName}
				/>
			);
			break;

		case defPopBoxType.ProfileCompelete:
			content = <ProfileCompelete {...popBox} />;
			break;

		case defPopBoxType.ChangePsw:
			content = (
				<ChangePsw
					btnBar={popBox.btnBar}
					title={popBox.title}
					message={popBox.message}
					ClickClose={popBox.ClickClose}
				/>
			);
			break;

		case defPopBoxType.LogoutHint:
			content = (
				<LogoutHint btnBar={popBox.btnBar} content={popBox.content} />
			);
			break;

		case defPopBoxType.DepositHint:
			content = <DepositHint />;
			break;

		case defPopBoxType.WithdrawalSuccess:
			content = <WithdrawalSuccess btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.OTPHint:
			content = <OTPHint btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.VerifyPhoneForm:
			content = <VerifyPhoneForm startUnixTime={popBox.startUnixTime} />;
			break;

		case defPopBoxType.UpdateProfile:
			content = (
				<UpdateProfile
					title={popBox.title}
					content={popBox.content}
					btnBar={popBox.btnBar}
				/>
			);
			break;

		case defPopBoxType.TurnoverAccumulated:
			content = <TurnoverAccumulated {...popBox} />;
			break;

		case defPopBoxType.PromotionDepositConfirm:
			content = (
				<PromotionDepositConfirm
					hint={popBox.hint}
					btnBar={popBox.btnBar}
				/>
			);
			break;

		case defPopBoxType.PromotionDepositConfirm:
			content = (
				<PromotionAmountConfirm
					langId={popBox.langId}
					promotionInfo={popBox.promotionInfo}
					clickClose={popBox.clickClose}
					setClaimPromotion={popBox.setClaimPromotion}
				/>
			);

			break;

		case defPopBoxType.default:
			break;

		default:
			break;
	}

	return popBox.isOpen ? (
		popBox.loading ? (
			<Loading />
		) : (
			<div id="popup" className="active">
				<div className="pop">
					<Suspense fallback={<Loading />}>{content}</Suspense>
				</div>
			</div>
		)
	) : (
		<></>
	);
};
