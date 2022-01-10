import React from "react";
import PropTypes from "prop-types";
import { GetCurrencyName } from "../common/common";
import { useGetSEODatas } from "../seo/seo";
import { SiteInfo, bannerImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";

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

const defaultSocialMedias = (
	<>
		<a href={SiteInfo.socialMedia.fb.link} target="_blank" rel="noreferrer">
			<img src={`${bannerImgUrl}/desktop/img/fba.png`} alt="fb" />
		</a>
		<a href={SiteInfo.socialMedia.ig.link} target="_blank" rel="noreferrer">
			<img src={`${bannerImgUrl}/desktop/img/ina.png`} alt="ig" />
		</a>
		<a
			href={SiteInfo.socialMedia.youtube.link}
			target="_blank"
			rel="noreferrer">
			<img src={`${bannerImgUrl}/desktop/img/yta.png`} alt="youtube" />
		</a>

		<a
			href={SiteInfo.socialMedia.twitter.link}
			target="_blank"
			rel="noreferrer">
			<img src={`${bannerImgUrl}/desktop/img/twa.png`} alt="twitter" />
		</a>
	</>
);

const FollowUsSection = ({ t, langId, currencyId }) => {
	const getPaymentList = () =>
		paymentList[GetCurrencyName({ langId, currencyId, t })] ??
		paymentList.MYR;
	const { errorPopBox } = usePopBox();
	const { SEODatas } = useGetSEODatas({
		getFromAPI: true,
		errorPopBox
	});

	const paymentArr = SEODatas?.paymentMethod
		? SEODatas.paymentMethod?.map(_p => {
				return (
					<a key={_p.name}>
						<img
							src={require(`../../styles/img/footer/${_p.image}`)}
							alt={_p.name}
						/>
					</a>
				);
		  })
		: getPaymentList()?.map(_p => {
				return (
					<a key={_p.name}>
						<img src={_p.img} alt={_p.name} />
					</a>
				);
		  });

	const socialMedias = SEODatas?.followUs
		? SEODatas.followUs?.map(el => (
				<a key={el.url} href={el.url} target="_blank" rel="noreferrer">
					<img
						src={`${bannerImgUrl}/desktop/img/${el.image}`}
						alt={el.url}
					/>
				</a>
		  ))
		: defaultSocialMedias;

	return (
		<div className="sfp">
			<div>
				<div className="title">{t("lbl_Follow_Us")}</div>
				<div>{socialMedias}</div>
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
	langId: PropTypes.string.isRequired,
	currencyId: PropTypes.number
};

export default FollowUsSection;
