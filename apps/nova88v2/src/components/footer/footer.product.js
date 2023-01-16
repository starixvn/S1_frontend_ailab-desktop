import React from "react";
import PropTypes from "prop-types";
import { defCurrencyList, GetCurrencyName } from "../common/common";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

const FooterProduct = ({
	t,
	langId,
	currencyId,
	defFooterProductList,
	path,
	linkToReferral,
	openLiveChat,
	isFullFooter
}) => {
	const currencyName = GetCurrencyName({ langId, currencyId, t });

	const getCurrencyLink = targetCurrencyId => {
		if (targetCurrencyId === defCurrencyList.MYR) {
			return ` https://aff.nova88mas102.com/?lang=${langId}`;
		}
		if (targetCurrencyId === defCurrencyList.INR) {
			return `https://aff.nova88india.com/?lang=${langId}`;
		}
		return `https://aff.nova88bkk.com/?lang=${langId}`;
	};

	return (
		<div className="footerList">
			<div className="item-wrapper">
				<div>
					<div className="title icon icon-friendreferral">
						{t("lbl_Referral_Program")}
					</div>
					<div>{t("lbl_Referral_Program_desc")}</div>
					<a onClick={linkToReferral}>
						{t("lbl_JoinNow")}
						{" >"}
					</a>
				</div>
				<div>
					<div className="title icon icon-affiliate">
						{t("lbl_Affiliate_Program")}
					</div>
					<div>{t("lbl_Affiliate_Program_desc")}</div>
					<a
						href={getCurrencyLink(currencyId)}
						style={
							allowedCurrencyList.affiliate.includes(currencyId)
								? {}
								: { pointerEvents: "none" }
						}
						target="_blank"
						rel="noreferrer"
					>
						{t("lbl_Apply_Now")}
						{" >"}
					</a>
				</div>
				<div>
					<div className="title icon icon-vip">
						{t("lbl_VIP_Program")}
					</div>
					<div>{t("lbl_VIP_Program_desc")}</div>
					<a
						href={`/${langId}/${path.vip.root}`}
						style={
							allowedCurrencyList.VIP.includes(currencyId)
								? {}
								: { pointerEvents: "none" }
						}
					>
						{t("lbl_More_Info")}
						{" >"}
					</a>
				</div>
				{/* <div>
					 <div className="title icon icon-live_tv">
					{t("lbl_Live_Streaming")}
				</div>
				<div>{t("lbl_Live_Streaming_desc")}</div>
				<a href={`/${langId}/${path.streaming.root}`}>
					{t("lbl_Watch_Now")}
					{" >"}
				</a> 
				 </div>  */}
				<div>
					<div className="title icon icon-livechat1">
						{t("lbl_Customer_Support")}
					</div>
					<div>{t("lbl_Customer_Support_desc")}</div>
					<a onClick={openLiveChat}>
						{t("lbl_Chat_Now")}
						{" >"}
					</a>
				</div>
			</div>
			<div className="item-wrapper">
				<div>
					{isFullFooter && (
						<div>
							<div className="title">
								{t(`lbl_Sports_Betting_Online_${currencyName}`)}
							</div>
							<div>
								{t("lbl_Sports_Betting_Online_Malaysia_desc")}
							</div>
						</div>
					)}
					{isFullFooter && (
						<div>
							<div className="title">
								{t("lbl_Soccer_Betting_Live_Betting")}
							</div>
							<div>
								{t("lbl_Soccer_Betting_Live_Betting_desc")}
							</div>
						</div>
					)}
				</div>
				<div>
					{isFullFooter &&
						defFooterProductList[2].map(item => (
							<div key={`footer-profuct-${item.title}`}>
								<div className="title">{t(item.title)}</div>
								<div>{t(item.content)}</div>
							</div>
						))}
				</div>
				<div>
					{isFullFooter &&
						defFooterProductList[3].map(item => (
							<div key={`footer-profuct-${item.title}`}>
								<div className="title">{t(item.title)}</div>
								<div>{t(item.content)}</div>
							</div>
						))}
				</div>
				<div>
					{isFullFooter &&
						defFooterProductList[4].map(item => (
							<div key={`footer-profuct-${item.title}`}>
								<div className="title">{t(item.title)}</div>
								<div>{t(item.content)}</div>
							</div>
						))}
				</div>
				<div>
					{isFullFooter &&
						defFooterProductList[5].map(item => (
							<div key={`footer-profuct-${item.title}`}>
								<div className="title">{t(item.title)}</div>
								<div>{t(item.content)}</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

FooterProduct.defaultProps = {
	currencyId: null
};

FooterProduct.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number,
	defFooterProductList: PropTypes.objectOf(PropTypes.any).isRequired,
	path: PropTypes.objectOf(PropTypes.any).isRequired,
	linkToReferral: PropTypes.func.isRequired,
	openLiveChat: PropTypes.func.isRequired,
	isFullFooter: PropTypes.bool.isRequired
};

export default FooterProduct;
