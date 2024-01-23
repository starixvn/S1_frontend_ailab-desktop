/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, Suspense, lazy, useMemo } from "react";
import { popBoxContext } from "./context";
import Cancel from "./popBox.cancel";
import UploadBankSlip from "./popBox.uploadBankSlip";
import Success from "./popBox.success";
import ErrorMsg from "./popBox.errorMsg";
import Login from "./popBox.login";
import Join from "./popBox.join";
import AddBankAccount from "./popBox.addBankAccount";
import AddEAccount from "./popBox.addEAccount";
import AddCryptoWallet from "./popBox.addCryptoWallet";
import AddBankSuccess from "./popBox.addBankSuccess";
import ConfirmDelete from "./popBox.confirmDelete";
import ProfileConfirmCheck from "./popBox.profileConfirmCheck";
import ProfileCompelete from "./popBox.profileCompelete";
import ChangePsw from "./popBox.changePsw";
import ChangePswHint from "./popBox.changePswHint";
import LogoutHint from "./popBox.logoutHint";
// import Loading from "./loading";
import DepositHint from "./popBox.depositHint";
import WithdrawalSuccess from "./popBox.withdrawalSuccess";
import OTPHint from "./popBox.otpHint";
import VerifyPhoneForm from "./popBox.verifyPhoneForm";
import UpdateProfile from "./popBox.updateProfile";
import TurnoverAccumulated from "./popBox.turnoverAccumulated";
import RegisterSuccess from "./popBox.registerSuccess";
import PromotionDepositConfirm from "./popBox.promotionDepositConfirm";
import PromotionAmountConfirm from "./popBox.promotionAmountConfirm";
import JoinReferral from "./popBox.joinReferral";
import OneGamingLink from "./popBox.oneGamingLink";
import defPopBoxType from "./defPopBoxType";
import RankingWinner from "./popBox.rankingWinner";
import DepositUploadBankSlip from "./popBox.depositUploadBankSlip";
import SuccessMySteryBox from "./popBox.successMySteryBox";
import BackupDomain from "./popBox.backupDomain";
import { PromptDeposit } from "./popBox.promptDeposit";
import UnderMaintain from "./popBox.underMaintain";
import Photo from "./popBox.photo";
import Modal from "./popBox.modal";
import NewYear from "./popbox.newYear";
import LinePay from "./popBox.linePayLink";
import BankQR from "./popBox.bankQR";
import WithdrawalMsg from "./popBox.withdrawalMsg";
import DepositMsg from "./popBox.depositMsg";
import EWalletQR from "./popBox.eWalletQR";

export default () => {
	const { popBox } = useContext(popBoxContext);

	let { content } = popBox;
	switch (popBox.popBoxType) {
		case defPopBoxType.Modal:
			content = (
				<Modal
					closePopBox={popBox.closePopBox}
					content={popBox.content}
					className={popBox.className}
				/>
			);
			break;

		case defPopBoxType.Cancel:
			content = <Cancel btnBar={popBox.btnBar} />;
			break;

		case defPopBoxType.UploadBankSlip: {
			const { isOpen, ...restProps } = popBox;
			content = <UploadBankSlip {...restProps} />;
			break;
		}

		case defPopBoxType.DepositUploadBankSlip: {
			content = (
				<DepositUploadBankSlip
					t={popBox.t}
					currencyId={popBox.currencyId}
					langId={popBox.langId}
					_isConvert={popBox._isConvert}
					setPopBox={popBox.setPopBox}
					formInfo={popBox.formInfo}
					localBankInfo={popBox.localBankInfo}
					receiptInfo={popBox.receiptInfo}
					resolve={popBox.resolve}
				/>
			);
			break;
		}

		case defPopBoxType.Success:
			content = (
				<Success
					icon={popBox.icon}
					description={popBox.description}
					btnBar={popBox.btnBar}
					title={popBox.title}
				/>
			);

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
				<AddBankAccount
					bankInfoSysList={popBox.bankInfoSysList}
					custBankInfo={popBox.custBankInfo}
					GetCustBankInfo={popBox.GetCustBankInfo}
				/>
			);
			break;

		case defPopBoxType.AddEAccount:
			content = (
				<AddEAccount
					EInfoSysList={popBox.EInfoSysList}
					custEWalletInfo={popBox.custEWalletInfo}
					getCustEWalletInfo={popBox.getCustEWalletInfo}
				/>
			);
			break;

		case defPopBoxType.AddCryptoWallet:
			content = (
				<AddCryptoWallet GetCustBankInfo={popBox.GetCustBankInfo} />
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
			content = <ChangePsw message={popBox.message} />;
			break;

		case defPopBoxType.ChangePswHint:
			content = (
				<ChangePswHint
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

		case defPopBoxType.RegisterSuccess:
			content = (
				<RegisterSuccess
					btnBar={popBox.btnBar}
					closeBtn={popBox.closeBtn}
				/>
			);
			break;
		case defPopBoxType.PromotionDepositConfirm:
			content = (
				<PromotionDepositConfirm
					hint={popBox.hint}
					btnBar={popBox.btnBar}
				/>
			);
			break;

		case defPopBoxType.PromotionAmountConfirm:
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

		case defPopBoxType.kiss918: {
			const Kiss918 = lazy(() => import("./popBox.918kiss"));
			content = (
				<Suspense fallback={<>Loading...</>}>
					<Kiss918 ClickClose={popBox.onClickClose} />
				</Suspense>
			);
			break;
		}

		case defPopBoxType.JoinReferral:
			content = <JoinReferral onClickClose={popBox.onClickClose} />;
			break;

		case defPopBoxType.SuccessMySteryBox:
			content = (
				<SuccessMySteryBox
					closePopBox={popBox.closePopBox}
					t={popBox.t}
					drawPrizeDatas={popBox.drawPrizeDatas}
				/>
			);
			break;

		case defPopBoxType.OneGamingLink:
			content = (
				<OneGamingLink
					btnBar={popBox.btnBar}
					clickClose={popBox.clickClose}
				/>
			);
			break;

		case defPopBoxType.RankingWinner:
			content = (
				<RankingWinner
					onClickClose={popBox.onClickClose}
					langId={popBox.langId}
				/>
			);
			break;

		case defPopBoxType.BackupDomain:
			content = (
				<BackupDomain
					onClickClose={popBox.onClickClose}
					linkList={popBox.linkList}
				/>
			);
			break;

		case defPopBoxType.PromptDeposit:
			content = <PromptDeposit onClickClose={popBox.onClickClose} />;
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

		case defPopBoxType.UnderMaintain: {
			content = <UnderMaintain clickClose={popBox.clickClose} />;
			break;
		}

		case defPopBoxType.Photo:
			content = <Photo photo={popBox.photo} />;
			break;

		case defPopBoxType.NewYear:
			content = (
				<NewYear langId={popBox.langId} setPopBox={popBox.clickClose} />
			);
			break;

		case defPopBoxType.LinePay:
			content = (
				<LinePay
					linePayLink={popBox.linePayLink}
					clickClose={popBox.clickClose}
					langId={popBox.langId}
				/>
			);
			break;

		case defPopBoxType.BankQR:
			content = (
				<BankQR
					channelName={popBox.channelName}
					onClickClose={popBox.onClickClose}
					qrUrl={popBox.qrUrl}
					amount={popBox.amount}
					transId={popBox.transId}
				/>
			);
			break;

		case defPopBoxType.WithdrawalMsg:
			content = (
				<WithdrawalMsg
					transId={popBox.transId}
					withdrawalMessageDetail={popBox.withdrawalMessageDetail}
				/>
			);
			break;

		case defPopBoxType.DepositMsg:
			content = (
				<DepositMsg
					transId={popBox.transId}
					depositMessageDetail={popBox.depositMessageDetail}
				/>
			);
			break;

		case defPopBoxType.EWalletQR:
			content = (
				<EWalletQR
					onClickClose={popBox.onClickClose}
					qrUrl={popBox.qrUrl}
					amount={popBox.amount}
					transId={popBox.transId}
				/>
			);
			break;
		case // eslint-disable-next-line no-fallthrough
		defPopBoxType.default:
			break;
	}

	const closeHandler = () => {
		if (
			popBox.popBoxType !== defPopBoxType.Photo &&
			popBox.popBoxType !== defPopBoxType.LinePay
		)
			return;

		popBox.clickClose();
	};

	const customLayout =
		popBox.popBoxType === defPopBoxType.Modal ||
		popBox.popBoxType === defPopBoxType.SuccessMySteryBox ||
		popBox.popBoxType === defPopBoxType.Photo ||
		popBox.popBoxType === defPopBoxType.LinePay ||
		popBox.popBoxType === defPopBoxType.WithdrawalMsg ||
		popBox.popBoxType === defPopBoxType.DepositMsg;

	if (!popBox.isOpen) return null;

	const memorizeContent = useMemo(
		() => content,
		[popBox.popBoxType, popBox.content]
	);

	return customLayout || popBox.customLayout ? (
		<div id="popup" className="active" onClick={closeHandler}>
			{memorizeContent}
		</div>
	) : (
		<div
			id="popup"
			className="active"
			onClick={popBox.clickBackDropToClose ? popBox.onClickClose : null}
		>
			<div className="pop">{memorizeContent}</div>
		</div>
	);
};
