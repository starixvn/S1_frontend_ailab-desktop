import React, { useContext, lazy, Suspense, useMemo } from "react";
import { MultiCaptchaProvider } from "@ailab-desktop/common";
import { popBoxContext } from "./context";
import Loading from "./loading";
import { defPopBoxType } from "./defPopBoxType";
import NewYear from "./popbox.newYear";

export default () => {
	const { popBox } = useContext(popBoxContext);
	let content = null;
	switch (popBox.popBoxType) {
		case defPopBoxType.Modal: {
			const Modal = lazy(() => import("./popBox.modal"));
			content = (
				<Modal
					closePopBox={popBox.closePopBox}
					content={popBox.content}
					className={popBox.className}
				/>
			);
			break;
		}

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
					receiptInfo={popBox.receiptInfo}
					resolve={popBox.resolve}
					isShowReceiptInfo={popBox.isShowReceiptInfo}
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

			content = (
				<MultiCaptchaProvider langId={popBox.langId}>
					<Join />
				</MultiCaptchaProvider>
			);
			break;
		}

		case defPopBoxType.AddBankAccount: {
			const AddBankAccount = lazy(() =>
				import("./popBox.addBankAccount")
			);
			content = (
				<AddBankAccount
					bankInfoSysList={popBox.bankInfoSysList}
					updateCustBankInfo={popBox.updateCustBankInfo}
					bankInfoDetail={popBox.bankInfoDetail}
				/>
			);
			break;
		}

		case defPopBoxType.AddCryptoWallet: {
			const AddCryptoWallet = lazy(() =>
				import("./popBox.addCryptoWallet")
			);
			content = (
				<AddCryptoWallet GetCustBankInfo={popBox.GetCustBankInfo} />
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

		case defPopBoxType.AddEWallet: {
			const AddEWallet = lazy(() => import("./popBox.addEWallet"));
			content = (
				<AddEWallet
					custEWalletInfo={popBox.custEWalletInfo}
					eWalletInfoSysList={popBox.eWalletInfoSysList}
					updateCustEWalletInfo={popBox.updateCustEWalletInfo}
				/>
			);

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
			content = <ChangePsw message={popBox.message} />;
			break;
		}

		case defPopBoxType.ChangePswHint: {
			const ChangePswHint = lazy(() => import("./popBox.changePswHint"));
			content = (
				<ChangePswHint
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
					langId={popBox.langId}
					promotionInfo={popBox.promotionInfo}
					clickClose={popBox.clickClose}
					setClaimPromotion={popBox.setClaimPromotion}
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

		case defPopBoxType.OfficialAnnounce: {
			const PopBoxOfficialAnnounce = lazy(() =>
				import("./popBox.officialAnnounce")
			);

			content = (
				<PopBoxOfficialAnnounce onClickClose={popBox.onClickClose} />
			);
			break;
		}

		case defPopBoxType.DepositGuide: {
			const PopBoxDepositGuide = lazy(() =>
				import("./popBox.depositGuide")
			);

			content = <PopBoxDepositGuide onClickClose={popBox.onClickClose} />;
			break;
		}

		case defPopBoxType.BackupDomain: {
			const BackupDomain = lazy(() => import("./popBox.backupDomain"));

			content = (
				<BackupDomain
					onClickClose={popBox.onClickClose}
					linkList={popBox.linkList}
				/>
			);
			break;
		}

		case defPopBoxType.UnderMaintain: {
			const UnderMaintain = lazy(() => import("./popBox.underMaintain"));
			content = <UnderMaintain clickClose={popBox.clickClose} />;
			break;
		}

		case defPopBoxType.NewYear:
			content = (
				<NewYear
					langId={popBox.langId}
					onClickClose={popBox.onClickClose}
				/>
			);
			break;

		case defPopBoxType.PaymentQR: {
			const PaymentQR = lazy(() => import("./popBox.paymentQR"));
			content = (
				<Suspense fallback={<>Loading...</>}>
					<PaymentQR {...popBox} />
				</Suspense>
			);
			break;
		}

		case defPopBoxType.WithdrawalMsg: {
			const WithdrawalMsg = lazy(() => import("./popBox.withdrawalMsg"));
			content = (
				<Suspense fallback={<>Loading...</>}>
					<WithdrawalMsg {...popBox} />
				</Suspense>
			);
			break;
		}

		case defPopBoxType.DepositMsg: {
			const DepositMsg = lazy(() => import("./popBox.depositMsg"));
			content = (
				<Suspense fallback={<>Loading...</>}>
					<DepositMsg {...popBox} />
				</Suspense>
			);
			break;
		}
		case defPopBoxType.BankQR: {
			const BankQR = lazy(() => import("./popBox.bankQR"));
			content = <BankQR {...popBox} />;
			break;
		}

		case defPopBoxType.default:
			break;

		default:
			break;
	}

	const customLayout =
		popBox.popBoxType === defPopBoxType.SuccessMySteryBox ||
		popBox.popBoxType === defPopBoxType.DepositGuide ||
		popBox.popBoxType === defPopBoxType.Modal;

	const memorizeContent = useMemo(
		() => content,
		[popBox.popBoxType, popBox.content, popBox.loading, popBox.isOpen]
	);

	if (popBox.loading) return <Loading />;

	if (!popBox.isOpen) return null;

	if (customLayout || popBox.customLayout)
		return <Suspense fallback={<Loading />}>{memorizeContent}</Suspense>;

	return (
		<div id="popup" className="active">
			<Suspense fallback={<Loading />}>{memorizeContent}</Suspense>
		</div>
	);
};
