import React, { useContext, useEffect, useState } from "react";
import QRCode from "qrcode.react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	useGetReferralCodeQuery,
	useGetReferralSummaryV2Query,
	useLazyGetReferralSettingDetailQuery
} from "@ailab-desktop/service";
import { isConvert, number_format } from "../common/common";
import {
	loadingContext,
	referralPopBox,
	userInfoContext
} from "../common/context";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { ReferralPopBox } from "./referral.popbox";

const Referral = () => {
	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { setReferralBox } = useContext(referralPopBox);
	const { t } = useTranslation();
	const _isConvert = isConvert(userInfo.currencyId);

	const [activeMedia, setActiveMedia] = useState();

	const { data: { data: referralSummaryData } = {} } =
		useGetReferralSummaryV2Query();

	const [getReferralSettingDetail] = useLazyGetReferralSettingDetailQuery();

	const {
		data: { data: referralCode } = {},
		isFetching: isGetReferralCodeFetching
	} = useGetReferralCodeQuery();

	const onCopy = async column_id => {
		const copyInput = document.getElementById(column_id);
		copyInput.select();
		document.execCommand("copy");
	};

	const getReferralDetail = async () => {
		const { data: referralSettingDetail } =
			await getReferralSettingDetail().unwrap();

		// * 如果從後台關閉, data = null, 則直接 return 出去
		if (!referralSettingDetail) return;

		const closePopBox = () => {
			setReferralBox({ isOpen: false });
		};

		setReferralBox({
			isOpen: true,
			content: (
				<ReferralPopBox
					data={referralSettingDetail}
					closePopBox={closePopBox}
					t={t}
				/>
			)
		});
	};

	const originHost = window.location.origin;
	const welcomeMessage = t("lbl_Referral_Welcome");
	const joinLink = `${originHost}/join?AffId=${referralCode}`;

	const referralInfoList = [
		{
			img: "icon-Facebook",
			url: `https://www.facebook.com/sharer/sharer.php?u=${originHost}&quote=${welcomeMessage}`
		},
		{
			img: "icon-WhatsApp",
			url: `https://wa.me/?&text=${welcomeMessage} ${originHost}`
		},
		{
			img: "icon-Telegram",
			url: `https://t.me/share/url?url=${originHost}&text=${welcomeMessage}`
		},
		{
			img: "icon-Line",
			url: `http://line.naver.jp/R/msg/text/?${welcomeMessage}%0D%0A${originHost}`
		}
	];

	useEffect(() => {
		// * 全域 loading
		setLoading(isGetReferralCodeFetching);
	}, [isGetReferralCodeFetching]);

	return (
		!loading && (
			<div className="infoModule refer">
				<img
					onClick={getReferralDetail}
					src={`${bannerImgUrl}/desktop/img/referral-topBanner-${
						userInfo.langId || "en"
					}.jpg`}
					alt=""
					className="refer-topbanner"
				/>

				<div className="referstatus">
					<div className="title">
						{t("lbl_ReferralStatus")}
						<Link
							href={`/${path.history.root}`}
							className="refer-history"
						>
							{t("lbl_History")}
						</Link>
					</div>
					<div className="referstatus-item">
						<div className="card">
							{t("lbl_NoOfAchievements")}
							<div>
								{referralSummaryData?.referralCount &&
									referralSummaryData.referralCount}
							</div>
						</div>
						<div className="card">
							{t("Label_Referral_AccumulateRewardAmount")}
							<div>
								<span>
									{t(`Currency_${userInfo.currencyId}`)}
								</span>

								{referralSummaryData?.amountSum &&
									number_format(
										referralSummaryData.amountSum,
										_isConvert
									)}
							</div>
						</div>
					</div>
				</div>

				<div className="referinfo">
					<div className="referinfo-left">
						<div className="title">
							{String(
								t("Label_Referral_Simple3StepsToShare")
							).toUpperCase()}
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src={`${bannerImgUrl}/desktop/img/referral-step-01.png`}
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("Label_Share")}
								</div>
								<p>{t("Label_Referral_ShareDescription")}</p>
							</div>
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src={`${bannerImgUrl}/desktop/img/referral-step-02.png`}
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("Label_Recharge")}
								</div>
								<p>{t("Label_Referral_Recharge")}</p>
							</div>
						</div>
						<div className="referinfo-step">
							<div className="icon">
								<img
									src={`${bannerImgUrl}/desktop/img/referral-step-03.png`}
									alt=""
								/>
							</div>
							<div>
								<div className="subtitle">
									{t("lbl_Rewards")}
								</div>
								<p>{t("Label_Referral_RewardsDescription")}</p>
							</div>
						</div>
					</div>
					<div className="referinfo-right">
						<div className="title">
							<div>
								{String(
									t("lbl_Your_link_invite")
								).toUpperCase()}
							</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("lbl_Referral_code")}
							</div>

							<div
								className="inputcopy"
								onClick={() => onCopy("ref_code")}
							>
								<input
									id="ref_code"
									type="text"
									value={referralCode}
								/>
							</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("lbl_Referral_link")}
							</div>
							<div
								className="inputcopy"
								onClick={() => onCopy("ref_link")}
							>
								<input
									type="text"
									value={joinLink}
									id="ref_link"
								/>
							</div>
						</div>
						<div className="referinfo-list">
							<div className="subtitle">QR CODE</div>

							<QRCode value={joinLink} />
						</div>
						<div className="referinfo-list">
							<div className="subtitle">
								{t("Label_Referral_ShareAcrossSocialMedia")}{" "}
							</div>
							<div className="referinfo-share">
								{referralInfoList.map(item => {
									const isHoverImg =
										item.img === activeMedia ? "-1" : "";
									return (
										<img
											key={item.img}
											onMouseEnter={() =>
												setActiveMedia(item.img)
											}
											onMouseLeave={() =>
												setActiveMedia("")
											}
											src={`${bannerImgUrl}/desktop/img/${item.img}${isHoverImg}.png`}
											alt=""
											onClick={() =>
												window.open(
													item.url,
													"",
													"height=600,width=600"
												)
											}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default Referral;
