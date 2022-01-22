import React from "react";
import PropTypes from "prop-types";
import {
	GetCurrencyName,
	defCurrencyList,
	langAndCurrMapping
} from "../common/common";
import { bannerImgUrl } from "../../config";

const paymentList = {
	MYR: [
		{
			name: "help2pay",
			img: `${bannerImgUrl}/desktop/img/footer/help2pay.png`
		},
		{
			name: "eeziepay",
			img: `${bannerImgUrl}/desktop/img/footer/eeziepay.png`
		},
		{ name: "fpay", img: `${bannerImgUrl}/desktop/img/footer/fpay.png` },
		{
			name: "truepay",
			img: `${bannerImgUrl}/desktop/img/footer/truepay.png`
		},
		{ name: "tngqr", img: `${bannerImgUrl}/desktop/img/footer/tngqr.png` },
		{
			name: "duitnowqr",
			img: `${bannerImgUrl}/desktop/img/footer/duitnowqr.png`
		}
	],
	THB: [
		{
			name: "help2pay",
			img: `${bannerImgUrl}/desktop/img/footer/help2pay.png`
		},
		{
			name: "eeziepay",
			img: `${bannerImgUrl}/desktop/img/footer/eeziepay.png`
		},
		{ name: "thaiqr", img: `${bannerImgUrl}/desktop/img/footer/thaiqr.png` }
	],
	IDR: [
		{
			name: "help2pay",
			img: `${bannerImgUrl}/desktop/img/footer/help2pay.png`
		},
		{
			name: "eeziepay",
			img: `${bannerImgUrl}/desktop/img/footer/eeziepay.png`
		},
		{ name: "ovo", img: `${bannerImgUrl}/desktop/img/footer/ovo.png` },
		{
			name: "gopay",
			img: `${bannerImgUrl}/desktop/img/footer/gopay.png`
		},
		{
			name: "dana",
			img: `${bannerImgUrl}/desktop/img/footer/dana.png`
		},
		{
			name: "sakuku",
			img: `${bannerImgUrl}/desktop/img/footer/sakuku.png`
		},
		{
			name: "linkaja",
			img: `${bannerImgUrl}/desktop/img/footer/linkaja.png`
		},
		{
			name: "shopeepay",
			img: `${bannerImgUrl}/desktop/img/footer/shopeepay.png`
		},
		{ name: "doku", img: `${bannerImgUrl}/desktop/img/footer/doku.png` }
	],
	INR: [
		{ name: "tenpay", img: `${bannerImgUrl}/desktop/img/footer/tenpay.png` }
	]
};

const defSocialMedia = {
	[defCurrencyList.MYR]: {
		fb: "https://www.facebook.com/nova88my/ ",
		twitter: "https://twitter.com/Nova88M",
		ig: "https://www.instagram.com/nova88my/ ",
		yt: "https://www.youtube.com/channel/UCoUtgrQN2E10oke1Hmj0ATw",
		telegram: "https://t.me/nova88my"
	},
	[defCurrencyList.INR]: {
		fb: "https://www.facebook.com/nova88india",
		ig: "https://www.instagram.com/nova88india/",
		telegram: "https://t.me/nova88india"
	},
	[defCurrencyList.THB]: {
		fb: "https://www.facebook.com/nova88thailandofficial/",
		ig: "https://www.instagram.com/nova88thai/",
		twitter: "https://twitter.com/nova88thai",
		telegram: "https://t.me/nova88thai",
		yt: "https://www.youtube.com/channel/UCw-GpZw8YG_VEPjJKZvbXqw"
	},
	[defCurrencyList.IDR]: {
		fb: "https://www.facebook.com/nova88indo",
		ig: "https://www.instagram.com/nova88indo/",
		twitter: "https://twitter.com/Nova88Indo",
		telegram: "https://t.me/nova88indo",
		yt: "https://www.youtube.com/channel/UCvX-E6TqyR3Ett7XMkTM1Bw",
		pinterest: "https://id.pinterest.com/Nova88Indonesia2"
	}
};

const socialMedias = langId => {
	return (
		<>
			{defSocialMedia[langAndCurrMapping[langId]]?.fb && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].fb}
					target="_blank"
					rel="noreferrer">
					<img src={`${bannerImgUrl}/desktop/img/fba.png`} alt="fb" />
				</a>
			)}
			{defSocialMedia[langAndCurrMapping[langId]]?.ig && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].ig}
					target="_blank"
					rel="noreferrer">
					<img src={`${bannerImgUrl}/desktop/img/ina.png`} alt="ig" />
				</a>
			)}
			{defSocialMedia[langAndCurrMapping[langId]]?.yt && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].yt}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/desktop/img/yta.png`}
						alt="youtube"
					/>
				</a>
			)}
			{defSocialMedia[langAndCurrMapping[langId]]?.twitter && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].twitter}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/desktop/img/twa.png`}
						alt="twitter"
					/>
				</a>
			)}
			{defSocialMedia[langAndCurrMapping[langId]]?.telegram && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].telegram}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/desktop/img/tga.png`}
						alt="telegram"
					/>
				</a>
			)}
			{defSocialMedia[langAndCurrMapping[langId]]?.pinterest && (
				<a
					href={defSocialMedia[langAndCurrMapping[langId]].pinterest}
					target="_blank"
					rel="noreferrer">
					<img
						src={`${bannerImgUrl}/desktop/img/pta.png`}
						alt="pinterest"
					/>
				</a>
			)}
		</>
	);
};

const FollowUsSection = ({ t, langId, currencyId }) => {
	const getPaymentList = () =>
		paymentList[GetCurrencyName({ langId, currencyId, t })] ??
		paymentList.MYR;

	const paymentArr = getPaymentList()?.map(_p => {
		return (
			<a key={_p.name}>
				<img src={_p.img} alt={_p.name} />
			</a>
		);
	});

	return (
		<div className="sfp">
			<div>
				<div className="title">{t("lbl_Follow_Us")}</div>
				<div>{socialMedias(langId)}</div>
			</div>
			<div>
				<div className="title">{t("lbl_Suggested_Browser")}</div>
				<div>
					<img
						src={`${bannerImgUrl}/desktop/img/gga.png`}
						alt="chrome"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/ffa.png`}
						alt="firefox"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/iea.png`}
						alt="edge"
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/sfa.png`}
						alt="safari"
					/>
				</div>
			</div>
			<div>
				<div className="title">{t("lbl_Payment_Method")}</div>
				<div className="paymentLogo">{paymentArr}</div>
			</div>
		</div>
	);
};

FollowUsSection.defaultProps = {
	currencyId: null
};

FollowUsSection.propTypes = {
	t: PropTypes.func.isRequired,
	currencyId: PropTypes.number
};

export default FollowUsSection;
