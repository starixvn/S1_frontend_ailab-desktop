import React, { useContext, lazy, Suspense } from "react";
import { popBoxContext } from "./context";
import Loading from "./loading";
import { defPopBoxType } from "./defPopBoxType";

export default () => {
	const { popBox } = useContext(popBoxContext);

	let content = null;
	switch (popBox.popBoxType) {
		case defPopBoxType.Cancel: {
			const Cancel = lazy(() => import("./popBox.cancel"));
			content = (
				<Cancel
					btnBar={popBox.btnBar}
					titleIcon={popBox.titleIcon}
					titleText={popBox.titleText}
					onClickClose={popBox.onClickClose}
				/>
			);
			break;
		}

		case defPopBoxType.Success: {
			const Success = lazy(() => import("./popBox.success"));
			content = (
				<Success
					btnBar={popBox.btnBar}
					titleIcon={popBox.titleIcon}
					titleText={popBox.titleText}
					message1={popBox.message1}
					message2={popBox.message2}
					onClickClose={popBox.onClickClose}
				/>
			);
			break;
		}

		case defPopBoxType.DepositUploadBankSlip: {
			const DepositUploadBankSlip = lazy(() =>
				import("./popBox.depositUploadBankSlip")
			);

			content = (
				<DepositUploadBankSlip
					t={popBox.t}
					langId={popBox.langId}
					_isConvert={popBox._isConvert}
					setPopBox={popBox.setPopBox}
					formInfo={popBox.formInfo}
					localBankInfo={popBox.localBankInfo}
					resolve={popBox.resolve}
				/>
			);
			break;
		}

		case defPopBoxType.UploadBankSlip: {
			const { isOpen, ...restProps } = popBox;
			const UploadBankSlip = lazy(() =>
				import("./popBox.uploadBankSlip")
			);
			content = <UploadBankSlip {...restProps} />;
			break;
		}

		case defPopBoxType.ErrorMsg: {
			const ErrorMsg = lazy(() => import("./popBox.errorMsg"));
			content = (
				<ErrorMsg
					btnBar={popBox.btnBar}
					message={popBox.message}
					errorCode={popBox.errorCode}
					icon={popBox.icon}
				/>
			);
			break;
		}

		case defPopBoxType.Login: {
			const Login = lazy(() => import("./popBox.login"));
			content = <Login />;
			break;
		}

		case defPopBoxType.Join: {
			const Join = lazy(() => import("./popBox.join"));
			content = <Join />;
			break;
		}

		case defPopBoxType.AddBankAccount: {
			const AddBankAccount = lazy(() =>
				import("./popBox.addBankAccount")
			);
			content = (
				<AddBankAccount bankInfoSysList={popBox.bankInfoSysList} />
			);
			break;
		}

		case defPopBoxType.AddBankSuccess: {
			const AddBankSuccess = lazy(() =>
				import("./popBox.addBankSuccess")
			);
			content = <AddBankSuccess btnBar={popBox.btnBar} />;
			break;
		}

		case defPopBoxType.ConfirmDelete: {
			const ConfirmDelete = lazy(() => import("./popBox.confirmDelete"));
			content = (
				<ConfirmDelete
					btnBar={popBox.btnBar}
					message={popBox.message}
					message2={popBox.message2}
				/>
			);
			break;
		}

		case defPopBoxType.ProfileConfirmCheck: {
			const ProfileConfirmCheck = lazy(() =>
				import("./popBox.profileConfirmCheck")
			);
			content = (
				<ProfileConfirmCheck
					btnBar={popBox.btnBar}
					accountName={popBox.accountName}
				/>
			);
			break;
		}

		case defPopBoxType.ProfileCompelete: {
			const ProfileCompelete = lazy(() =>
				import("./popBox.profileCompelete")
			);
			content = <ProfileCompelete {...popBox} />;
			break;
		}

		case defPopBoxType.ChangePsw: {
			const ChangePsw = lazy(() => import("./popBox.changePsw"));
			content = (
				<ChangePsw
					btnBar={popBox.btnBar}
					title={popBox.title}
					message={popBox.message}
					ClickClose={popBox.ClickClose}
					titleIcon={popBox.titleIcon}
				/>
			);
			break;
		}

		case defPopBoxType.LogoutHint: {
			const LogoutHint = lazy(() => import("./popBox.logoutHint"));
			content = (
				<LogoutHint btnBar={popBox.btnBar} content={popBox.content} />
			);
			break;
		}
		case defPopBoxType.DepositHint: {
			const DepositHint = lazy(() => import("./popBox.depositHint"));
			content = <DepositHint />;
			break;
		}

		case defPopBoxType.WithdrawalSuccess: {
			const WithdrawalSuccess = lazy(() =>
				import("./popBox.withdrawalSuccess")
			);
			content = (
				<WithdrawalSuccess
					btnBar={popBox.btnBar}
					onClickClose={popBox.onClickClose}
				/>
			);
			break;
		}

		case defPopBoxType.OTPHint: {
			const OTPHint = lazy(() => import("./popBox.otpHint"));
			content = <OTPHint btnBar={popBox.btnBar} />;
			break;
		}

		case defPopBoxType.VerifyPhoneForm: {
			const VerifyPhoneForm = lazy(() =>
				import("./popBox.verifyPhoneForm")
			);
			content = <VerifyPhoneForm startUnixTime={popBox.startUnixTime} />;
			break;
		}

		case defPopBoxType.UpdateProfile: {
			const UpdateProfile = lazy(() => import("./popBox.updateProfile"));
			content = (
				<UpdateProfile
					title={popBox.title}
					content={popBox.content}
					btnBar={popBox.btnBar}
				/>
			);
			break;
		}

		case defPopBoxType.TurnoverAccumulated: {
			const TurnoverAccumulated = lazy(() =>
				import("./popBox.turnoverAccumulated")
			);
			content = <TurnoverAccumulated {...popBox} />;
			break;
		}

		case defPopBoxType.PromotionDepositConfirm: {
			const PromotionDepositConfirm = lazy(() =>
				import("./popBox.promotionDepositConfirm")
			);
			content = (
				<PromotionDepositConfirm
					hint={popBox.hint}
					btnBar={popBox.btnBar}
				/>
			);
			break;
		}

		case defPopBoxType.PromotionAmountConfirm: {
			const PromotionAmountConfirm = lazy(() =>
				import("./popBox.promotionAmountConfirm")
			);

			content = (
				<PromotionAmountConfirm
					currencyId={popBox.currencyId}
					langId={popBox.langId}
					promotionInfo={popBox.promotionInfo}
					clickClose={popBox.clickClose}
					setClaimPromotion={popBox.setClaimPromotion}
				/>
			);
			break;
		}

		case defPopBoxType.SuccessAngPow: {
			const SuccessAngPow = lazy(() => import("./popBox.successAngPow"));

			content = (
				<SuccessAngPow
					closePopBox={popBox.closePopBox}
					t={popBox.t}
					drawPrizeDatas={popBox.drawPrizeDatas}
				/>
			);
			break;
		}

		case defPopBoxType.SuccessMySteryBox: {
			const SuccessMySteryBox = lazy(() =>
				import("./popBox.successMySteryBox")
			);

			content = (
				<SuccessMySteryBox
					clickClose={popBox.clickClose}
					t={popBox.t}
					drawPrizeDatas={popBox.drawPrizeDatas}
				/>
			);
			break;
		}

		case defPopBoxType.RankingWinner: {
			const PopBoxRankingWinner = lazy(() =>
				import("./popBox.rankingWinner")
			);

			content = <PopBoxRankingWinner />;
			break;
		}

		case defPopBoxType.JoinReferral: {
			const JoinReferral = lazy(() => import("./popBox.joinReferral"));
			content = <JoinReferral onClickClose={popBox.onClickClose} />;
			break;
		}

		case defPopBoxType.default:
			break;

		default:
			break;
	}

	if (popBox.loading) return <Loading />;

	const customLayout =
		popBox.popBoxType === defPopBoxType.SuccessAngPow ||
		popBox.popBoxType === defPopBoxType.SuccessMySteryBox;

	if (!popBox.isOpen) return null;

	if (customLayout)
		return <Suspense fallback={<Loading />}>{content}</Suspense>;

	return (
		<div id="popup" className="active">
			<Suspense fallback={<Loading />}>{content}</Suspense>
		</div>
	);
};
