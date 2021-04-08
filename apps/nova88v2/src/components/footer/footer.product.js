import React from "react";
import PropTypes from "prop-types";

export const FooterProduct = ({
	t,
	defFooterProductList,
	path,
	SiteInfo,
	langId,
	linkToReferral,
	openLiveChat
}) => {
	return (
		<div className="footerList">
			<div>
				<div className="title icon icon-friendreferral">
					{t("lbl_Referral_Program")}
				</div>
				<div>{t("lbl_Referral_Program_desc")}</div>
				<a onClick={linkToReferral}>
					{t("lbl_JoinNow")}
					{" >"}
				</a>
				{defFooterProductList[1].map(item => {
					return (
						<div key={`footer-profuct-${item.title}`}>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
			<div>
				<div className="title icon icon-affiliate">
					{t("lbl_Affiliate_Program")}
				</div>
				<div>{t("lbl_Affiliate_Program_desc")}</div>
				<a href={`${SiteInfo.affiliateLink}/?lang=${langId}`}>
					{t("lbl_Apply_Now")}
					{" >"}
				</a>
				{defFooterProductList[2].map(item => {
					return (
						<div key={`footer-profuct-${item.title}`}>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
			<div>
				<div className="title icon icon-vip">
					{t("lbl_VIP_Program")}
				</div>
				<div>{t("lbl_VIP_Program_desc")}</div>
				<a href={`/${langId}/${path.vip.root}`}>
					{t("lbl_More_Info")}
					{" >"}
				</a>
				{defFooterProductList[3].map(item => {
					return (
						<div key={`footer-profuct-${item.title}`}>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
			<div>
				<div className="title icon icon-live_tv">
					{t("lbl_Live_Streaming")}
				</div>
				<div>{t("lbl_Live_Streaming_desc")}</div>
				<a href={`/${langId}/${path.streaming.root}`}>
					{t("lbl_Watch_Now")}
					{" >"}
				</a>
				{defFooterProductList[4].map(item => {
					return (
						<div key={`footer-profuct-${item.title}`}>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
			<div>
				<div className="title icon icon-livechat1">
					{t("lbl_Customer_Support")}
				</div>
				<div>{t("lbl_Customer_Support_desc")}</div>
				<a onClick={openLiveChat}>
					{t("lbl_Chat_Now")}
					{" >"}
				</a>
				{defFooterProductList[5].map(item => {
					return (
						<div key={`footer-profuct-${item.title}`}>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
FooterProduct.propTypes = {
	t: PropTypes.func.isRequired,
	defFooterProductList: PropTypes.objectOf(PropTypes.any).isRequired,
	path: PropTypes.objectOf(PropTypes.any).isRequired,
	SiteInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	langId: PropTypes.string.isRequired,
	linkToReferral: PropTypes.func.isRequired,
	openLiveChat: PropTypes.func.isRequired
};

export default FooterProduct;
