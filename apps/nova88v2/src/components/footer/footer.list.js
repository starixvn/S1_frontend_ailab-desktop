import React from "react";

const defFooterList = {
	1: [
		{
			title: "lbl_Sports_Betting_Online_Malaysia",
			content: "lbl_Sports_Betting_Online_Malaysia_desc"
		},
		{
			title: "lbl_Soccer_Betting_Live_Betting",
			content: "lbl_Soccer_Betting_Live_Betting_desc"
		}
	],
	2: [
		{
			title: "lbl_Sports_Betting_In_Play_Betting",
			content: "lbl_Sports_Betting_In_Play_Betting_desc"
		},
		{
			title: "lbl_Online_Casino_Live_Casino",
			content: "lbl_Online_Casino_Live_Casino_desc"
		},
		{
			title: "lbl_Keno_Lottery_Betting",
			content: "lbl_Keno_Lottery_Betting_desc"
		}
	],
	3: [
		{
			title: "lbl_Virtual_Sports",
			content: "lbl_Virtual_Sports_desc"
		},
		{
			title: "lbl_Fishing_in_footer",
			content: "lbl_Fishing_desc"
		},
		{
			title: "lbl_eSports",
			content: "lbl_Esport_desc"
		}
	],
	4: [
		{
			title: "lbl_Mobile_Betting",
			content: "lbl_Mobile_Betting_desc"
		},
		{
			title: "lbl_Open_An_Account",
			content: "lbl_Open_An_Account_desc"
		},
		{
			title: "lbl_Payment_Options",
			content: "lbl_Payment_Options_desc"
		}
	],
	5: [
		{
			title: "lbl_Affiliates_in_footer",
			content: "lbl_Affiliates_desc"
		},
		{
			title: "lbl_Responsible_Gaming",
			content: "lbl_Responsible_Gaming_desc"
		},
		{
			title: "lbl_Security",
			content: "lbl_Security_desc"
		}
	]
};

export default ({ t }) => {
	return (
		<div className="footerList">
			<div>
				<div className="title icon icon-friendreferral">
					{t("lbl_Referral_Program")}
				</div>
				<div>{t("lbl_Referral_Program_desc")}</div>
				<a href="">{t("lbl_PlayNow")}</a>
				{defFooterList[1].map(item => {
					return (
						<div>
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
				<a href="">{t("lbl_JoinNow")}</a>
				{defFooterList[2].map(item => {
					return (
						<div>
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
				<a href="">{t("lbl_Apply_Now")}</a>
				{defFooterList[3].map(item => {
					return (
						<div>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
			<div>
				<div className="title icon icon-live_tv">
					{t("lbl_Live_Sport")}
				</div>
				<div>{t("lbl_LiveStreaming_desc")}</div>
				<a href="">{t("lbl_Watch_Now")}</a>
				{defFooterList[4].map(item => {
					return (
						<div>
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
				<a href="">{t("lbl_Chat_Now")}</a>
				{defFooterList[5].map(item => {
					return (
						<div>
							<div className="title">{t(item.title)}</div>
							<div>{t(item.content)}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
