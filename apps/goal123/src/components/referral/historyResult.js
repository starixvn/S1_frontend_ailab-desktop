import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const Content = props => {
	const { t } = useTranslation();
	const {
		idx,
		custId,
		settledDate,
		totalDeposit,
		rewardAmount,
		onChangeSelectedStep,
		onRefFriendDetail
	} = props;

	console.log({
		idx,
		custId,
		settledDate,
		totalDeposit,
		rewardAmount,
		onChangeSelectedStep,
		onRefFriendDetail
	});
	return (
		<div>
			<div>{idx}</div>
			<div>
				{moment(settledDate, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("DD/MM/YYYY")}
			</div>

			<div>{number_format({ number: totalDeposit })}</div>

			<div>{number_format({ number: rewardAmount })}</div>

			<div>
				<a
					onClick={async () => {
						const payload = {
							startDate: moment(settledDate).unix(),
							endDate: moment(settledDate).endOf("day").unix(),
							pageNumber: 1,
							pageSize: 10
						};

						await onRefFriendDetail(payload);
						onChangeSelectedStep(2);
					}}>
					{t("lbl_Details")}
				</a>
			</div>
		</div>
	);
};

export default Content;
