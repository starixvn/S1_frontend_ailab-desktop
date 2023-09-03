import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const ReferralDetail = ({ referralDetail = [], onChangeSelectedStep }) => {
	const { t } = useTranslation();

	return (
		<>
			<nav className="breadcrumb">
				<ul>
					<li className="icon breadcrumb-item">
						<button onClick={() => onChangeSelectedStep(1)}>
							{t("lbl_ReferralHistory")}
						</button>
					</li>
					<li className="icon breadcrumb-item active">
						<span href="referralhistoryStep2.html">
							{t("lbl_Details")}
						</span>
					</li>
				</ul>
			</nav>

			<div className="list history ">
				<div className="listHeader">
					<div>{t("lbl_NO")}</div>
					<div>{t("lbl_Date")} (+07:00)</div>
					<div>{t("lbl_Username")}</div>
					<div>{t("lbl_TotalDeposit")}</div>
					<div>{t("lbl_RewardAmount")}</div>
				</div>

				<div className="listBody">
					{referralDetail.map((item, index) => (
						// eslint-disable-next-line react/no-array-index-key
						<div key={`${item.userName}-${index}`}>
							<div>{index + 1}</div>
							<div>
								{moment(
									item.settledDate,
									"YYYY-MM-DDThh:mm:ssZ"
								)
									.zone("+07:00")
									.format("DD/MM/YYYY")}
							</div>
							<div>{item.userName}</div>
							<div>
								{number_format({ number: item.totalDeposit })}
							</div>
							<div>
								{number_format({ number: item.rewardAmount })}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="btnGroup">
				<button
					className="blue"
					onClick={() => onChangeSelectedStep(1)}>
					{t("lbl_Back")}
				</button>
			</div>
		</>
	);
};

export default ReferralDetail;
