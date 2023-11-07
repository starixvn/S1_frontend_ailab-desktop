import React, { useContext } from "react";
import PropTypes from "prop-types";
import { referralPopBox, popBoxContext } from "../common/context";

export default () => {
	const { popBox } = useContext(popBoxContext);
	const { referralBox, setReferralBox } = useContext(referralPopBox);

	const { isOpen: openReferralBox } = referralBox;

	const closePopBox = () => {
		setReferralBox({ isOpen: false });
	};

	return (
		<div
			onClick={closePopBox}
			className={`popup promotionpop refferalpop${
				popBox.isOpen || openReferralBox ? " active" : ""
			}`}
		>
			{referralBox.content}
		</div>
	);
};

export const ReferralPopBox = ({ data, closePopBox, t }) => (
	<div className="promotionpop-inner">
		<div className="promotionpop-title">Referral LIST</div>
		<div className="icon-close-primary" onClick={closePopBox} />
		<div className="promotionpop-list">
			<div className="promotionpop-banner">
				<img src={data.referralContent?.bannerUrl} alt="banner" />
			</div>
		</div>

		<div className="promotionpop-caption">
			<div className="promotionpop-caption-item">
				<div className="title">{data.referralContent?.title}</div>
				<div className="subtitle">
					{data.referralContent?.description}
				</div>
			</div>
		</div>

		<div className="promotionpop-info">
			<div className="promotionpop-info-item">
				<div>{t("lbl_ReferralReward")}</div>
				<div>{data.referralReward}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_FriendsInvitationLimit")}</div>
				<div>{data.invitationLimit}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_DepositRequirement")}</div>
				<div>{data.agentDeposit}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_ValidBetRequirement")}</div>
				<div>{data.agentValidBet}</div>
			</div>
		</div>

		<div className="promotionpop-info">
			<div className="promotionpop-info-item">
				<div>{t("lbl_ReferredFreeCredit")}</div>
				<div>{data.memberReward}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_DepositRequirement")}</div>
				<div>{data.deposit}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_ValidBetRequirement")}</div>
				<div>{data.vaildBet}</div>
			</div>
			<div className="promotionpop-info-item">
				<div>{t("lbl_TermPeriodWithin")}</div>
				<div>
					{data.periodDays} ({t("lbl_Days")})
				</div>
			</div>
		</div>

		<div
			className="promotionpop-content"
			dangerouslySetInnerHTML={{
				__html: data.referralContent?.detail
			}}
		/>
	</div>
);

ReferralPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	closePopBox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
};
