import React, { useContext } from "react";
import PropTypes from "prop-types";
import { popBoxContext, referralPopBox } from "../common/context";

export default () => {
	const { popBox } = useContext(popBoxContext);
	const { referralBox, setReferralBox } = useContext(referralPopBox);

	const { isOpen: openReferralBox } = referralBox;

	const closePopBox = () => {
		setReferralBox({ isOpen: false });
	};

	return (
		<div className={`promoInfoPop${openReferralBox ? " active" : ""}`}>
			<div
				onClick={closePopBox}
				className={`promoInfoPopMask${
					popBox.isOpen || !openReferralBox ? "" : " active"
				}`}
			/>
			{referralBox.content}
		</div>
	);
};

export const ReferralPopBox = ({ data, closePopBox, t }) => (
	<div className="promotionsInfo">
		<div className="icon icon-close" onClick={closePopBox} />
		<img src={data.referralContent?.bannerUrl} alt="banner" />
		<div className="proData">
			<div className="proDataTitle">
				<div className="txt-blue15">
					{data.referralContent?.title}
					<div className="txt-white">
						{data.referralContent?.description}
					</div>
				</div>
			</div>
			<div className="rolloverList">
				<div>
					<div>{t("lbl_ReferralReward")}</div>
					<div>{data.referralReward}</div>
				</div>
				<div>
					<div>{t("lbl_FriendsInvitationLimit")}</div>
					<div>{data.invitationLimit}</div>
				</div>
				<div>
					<div>{t("lbl_DepositRequirement")}</div>
					<div>{data.agentDeposit}</div>
				</div>
				<div>
					<div>{t("lbl_ValidBetRequirement")}</div>
					<div>{data.agentValidBet}</div>
				</div>
			</div>
			<div className="rolloverList">
				<div>
					<div>{t("lbl_ReferredFreeCredit")}</div>
					<div>{data.memberReward}</div>
				</div>
				<div>
					<div>{t("lbl_DepositRequirement")}</div>
					<div>{data.deposit}</div>
				</div>
				<div>
					<div>{t("lbl_ValidBetRequirement")}</div>
					<div>{data.vaildBet}</div>
				</div>
				<div>
					<div>{t("lbl_TermPeriodWithin")}</div>
					<div>
						{data.periodDays} ({t("lbl_Days")})
					</div>
				</div>
			</div>
			<div
				className="proDataBody"
				dangerouslySetInnerHTML={{
					__html: data.referralContent?.detail
				}}
			/>
		</div>
	</div>
);

ReferralPopBox.propTypes = {
	data: PropTypes.objectOf(PropTypes.any).isRequired,
	closePopBox: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired
};
