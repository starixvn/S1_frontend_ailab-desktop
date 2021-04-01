import React from "react";

export default ({
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
					{t("lbl_PlayNow")}
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
					{t("lbl_JoinNow")}
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
					{t("lbl_Apply_Now")}
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
					{t("lbl_Live_Sports")}
				</div>
				<div>{t("lbl_LiveStreaming_desc")}</div>
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
