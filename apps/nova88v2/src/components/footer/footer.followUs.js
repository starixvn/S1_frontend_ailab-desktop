import React, { useState } from "react";
import PropTypes from "prop-types";
import { GetCurrencyName } from "../common/common";
import { useGetSEODatas } from "../seo/seo";
import { SiteInfo, bannerImgUrl } from "../../config";
import usePopBox from "../hook/usePopBox";
import ImgChrome from "../../styles/img/gga.png";
import ImgFireFox from "../../styles/img/ffa.png";
import ImgEdge from "../../styles/img/iea.png";
import ImgSafari from "../../styles/img/sfa.png";
import help2pay from "../../styles/img/footer/help2pay.png";
import eeziepay from "../../styles/img/footer/eeziepay.png";
import fpay from "../../styles/img/footer/fpay.png";
import truepay from "../../styles/img/footer/truepay.png";
import tngqr from "../../styles/img/footer/tngqr.png";
import duitnowqr from "../../styles/img/footer/duitnowqr.png";
import thaiqr from "../../styles/img/footer/thaiqr.png";
import ovo from "../../styles/img/footer/ovo.png";
import gopay from "../../styles/img/footer/gopay.png";
import dana from "../../styles/img/footer/dana.png";
import sakuku from "../../styles/img/footer/sakuku.png";
import linkaja from "../../styles/img/footer/linkaja.png";
import shopeepay from "../../styles/img/footer/shopeepay.png";
import doku from "../../styles/img/footer/doku.png";
import tenpay from "../../styles/img/footer/tenpay.png";

const paymentList = {
	MYR: [
		{ name: "help2pay", img: help2pay },
		{ name: "eeziepay", img: eeziepay },
		{ name: "fpay", img: fpay },
		{ name: "truepay", img: truepay },
		{ name: "tngqr", img: tngqr },
		{ name: "duitnowqr", img: duitnowqr }
	],
	THB: [
		{ name: "help2pay", img: help2pay },
		{ name: "eeziepay", img: eeziepay },
		{ name: "thaiqr", img: thaiqr }
	],
	IDR: [
		{ name: "help2pay", img: help2pay },
		{ name: "eeziepay", img: eeziepay },
		{ name: "ovo", img: ovo },
		{ name: "gopay", img: gopay },
		{ name: "dana", img: dana },
		{ name: "sakuku", img: sakuku },
		{ name: "linkaja", img: linkaja },
		{ name: "shopeepay", img: shopeepay },
		{ name: "doku", img: doku }
	],
	INR: [{ img: tenpay, name: "tenpay" }]
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
					<img src={ImgChrome} alt="chrome" />
					<img src={ImgFireFox} alt="firefox" />
					<img src={ImgEdge} alt="edge" />
					<img src={ImgSafari} alt="safari" />
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
