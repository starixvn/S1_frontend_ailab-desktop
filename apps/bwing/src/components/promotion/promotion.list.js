import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ProcessBar from "./promotion.processBar";
import { isArrayNotEmpty, getStampStyle, isClaimed } from "./promotion.common";
import PromotionJoinButton from "./promotion.joinButton";
import { defPromotionType, defFilterType } from "./promotion.def";
import { useHandlePromotionInfo } from "./promotionInfo.popbox";
import { getExpiryTime } from "./promotion.promoRule";
import { getUrlParameter } from "../common/common";

const PromotionList = ({
	t,
	userInfo,
	filter,
	promoList,
	refreshProcessBar,
	staticPromotions = [],
	afterJoinCallBack
}) => {
	const { getPromotionDetail } = useHandlePromotionInfo({});
	const urlBonusCode = getUrlParameter("BonusCode");

	const clickMoreInfo = (langId, bonusCode) => {
		getPromotionDetail(langId, bonusCode);
	};

	const { isLogin, currencyId } = userInfo;

	useEffect(() => {
		if (urlBonusCode) {
			clickMoreInfo(userInfo.langId, urlBonusCode);
		}
	}, []);

	const rows = promoList?.map(p => {
		const promoDisplayStyle = getStampStyle(filter, p);
		const timezone = moment().format("Z");
		const isDisplay =
			moment.unix(p.displayFrom).subtract(timezone).diff(moment()) <= 0 &&
			moment.unix(p.displayTo).subtract(timezone).diff(moment()) >= 0;
		const isBeClaimed = isClaimed(p);

		return (
			isDisplay && (
				<div
					key={`promotion.list-${p.bonusCode}-${p.categoryId}-${p.tpId}`}
					className={promoDisplayStyle}
				>
					<div className="lobby-promotion-img">
						<img src={p.banner} alt={p.title} />
					</div>

					<div className="lobby-promotion-info">
						<div className="lobby-promotion-data">
							<div className="title">{p.title}</div>
							<div className="subtitle">{p.description}</div>
							{!isBeClaimed && (
								<div className="time">
									{t("lbl_RemainingTime")}
									<span>{getExpiryTime(t, p)}</span>
								</div>
							)}

							<ProcessBar
								{...p}
								t={t}
								currencyId={currencyId}
								RefreshProcessBar={refreshProcessBar.bind(
									this,
									p
								)}
							/>
						</div>

						<div
							className={`btn-group ${
								isBeClaimed ? "btnclaimed" : ""
							}`}
						>
							<PromotionJoinButton
								promotionInfo={p}
								userInfo={userInfo}
								inListPage={true}
								filter={filter}
								callBack={afterJoinCallBack}
							/>

							{p.promotionType === defPromotionType.other &&
							!p.promotionAction ? (
								<a
									href={p.promotionLink}
									target="_blank"
									rel="noreferrer"
									className="btn-check"
								>
									{t("lbl_Promotion_MoreInfo").toUpperCase()}
								</a>
							) : (
								<button
									className="btn-secondary"
									onClick={clickMoreInfo.bind(
										this,
										userInfo.langId,
										p.bonusCode
									)}
								>
									{t("lbl_Promotion_MoreInfo")}
								</button>
							)}
						</div>
					</div>
				</div>
			)
		);
	});

	if (isLogin === null) return null;

	if (
		isArrayNotEmpty(promoList) ||
		(isArrayNotEmpty(staticPromotions) && filter === defFilterType.all)
	)
		return (
			<div className="lobby-promotion">
				{rows}
				{filter === defFilterType.all ? staticPromotions : null}
			</div>
		);

	return <div className="nodata">{t("msg_NoData")}</div>;
};

PromotionList.defaultProps = {
	promoList: null,
	userInfo: null,
	filter: null,
	refreshProcessBar: () => null,
	staticPromotions: null,
	afterJoinCallBack: () => null
};

PromotionList.propTypes = {
	t: PropTypes.func.isRequired,
	promoList: PropTypes.arrayOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any),
	filter: PropTypes.string,
	refreshProcessBar: PropTypes.func,
	staticPromotions: PropTypes.arrayOf(PropTypes.any),
	afterJoinCallBack: PropTypes.func
};

export default PromotionList;
