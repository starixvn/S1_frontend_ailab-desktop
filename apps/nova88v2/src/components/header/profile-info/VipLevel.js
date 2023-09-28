import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { useGetCustVIPProgressQuery } from "@ailab-desktop/service";
import { HEADER_VIP_CLUB_IMG_URL_LIST } from "../../vip/vip.def";
import { useAuth } from "../../hook";
import { isConvert, number_format } from "../../common/common";
import paths from "../../../router";

const VipLevel = ({ isVipLevelHighest }) => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();
	const { data: { data: custVIPProgress } = {} } =
		useGetCustVIPProgressQuery(null);
	const currentVipLevelImgUrl =
		HEADER_VIP_CLUB_IMG_URL_LIST[custVIPProgress?.currentVipLevel - 1];

	const nextVipLevelImgUrl =
		HEADER_VIP_CLUB_IMG_URL_LIST[custVIPProgress?.currentVipLevel];

	const progress = Math.floor(
		(custVIPProgress?.actualDeposit / custVIPProgress?.upDeposit) * 100
	);

	return (
		<>
			<div className="vip-img">
				<img src={currentVipLevelImgUrl} alt="img-current-vip" />

				{!isVipLevelHighest && (
					<>
						<img
							src="https://banner.0814media.net/desktop/img/4.0/dot-2.png"
							alt=""
						/>
						<img src={nextVipLevelImgUrl} alt="img-next-vip" />
					</>
				)}
			</div>
			{/* // * vip 等級最高時顯示 ReachedTheHighestLevel */}
			{isVipLevelHighest ? (
				<Link
					to={`/${userInfo.langId}/${paths.vip.root}`}
					className="highest-text"
				>
					{t("Label_Vip_ReachedTheHighestLevel")}
				</Link>
			) : (
				<>
					<div className="progress">
						<div
							className="progress-bar"
							// * 取較小值，最大寬度 100%
							style={{ width: `${Math.min(progress, 100)}%` }}
						/>
					</div>
					<div className="progress-number">
						<div>
							{number_format(
								custVIPProgress?.actualDeposit,
								isConvert(userInfo.currencyId)
							)}
							/{" "}
							{number_format(
								custVIPProgress?.upDeposit,
								isConvert(userInfo.currencyId)
							)}
						</div>
						<Link to={`/${userInfo.langId}/${paths.vip.root}`}>
							{t("Label_Vip_NextMilestone")}
						</Link>
					</div>
				</>
			)}
		</>
	);
};

VipLevel.propTypes = {
	isVipLevelHighest: PropTypes.bool.isRequired
};

export default VipLevel;
