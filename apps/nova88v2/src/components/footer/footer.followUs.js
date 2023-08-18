import React from "react";
import PropTypes from "prop-types";
import { GetCurrencyName, langAndCurrMapping } from "../common/common";
import { bannerImgUrl } from "../../config";
import useGetSocialChannel, {
	defDisplayPage,
	footerImgName
} from "../hook/useGetSocialChannel";

const paymentList = {
	MYR: [
		{
			name: "help2pay",
			img: `${bannerImgUrl}/desktop/img/footer/help2pay.png`
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
		{ name: "thaiqr", img: `${bannerImgUrl}/desktop/img/footer/thaiqr.png` }
	],
	IDR: [
		{
			name: "help2pay",
			img: `${bannerImgUrl}/desktop/img/footer/help2pay.png`
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
	],
	BDT: [
		{
			name: "DirePay",
			img: `${bannerImgUrl}/desktop/img/footer/direpay.png`
		},
		{
			name: "FxBit",
			img: `${bannerImgUrl}/desktop/img/footer/fxbit.png`
		}
	],
	CNY: [
		{
			name: "DirePay",
			img: `${bannerImgUrl}/desktop/img/footer/direpay.png`
		},
		{
			name: "FxBit",
			img: `${bannerImgUrl}/desktop/img/footer/fxbit.png`
		}
	],
	USD: [
		{
			name: "DirePay",
			img: `${bannerImgUrl}/desktop/img/footer/direpay.png`
		},
		{
			name: "FxBit",
			img: `${bannerImgUrl}/desktop/img/footer/fxbit.png`
		}
	],
	VND: [
		{
			name: "ACB",
			img: `${bannerImgUrl}/desktop/img/footer/acb.png`
		},
		{
			name: "MB",
			img: `${bannerImgUrl}/desktop/img/footer/mb.png`
		},
		{
			name: "VCB",
			img: `${bannerImgUrl}/desktop/img/footer/vcb.png`
		},
		{
			name: "VPB",
			img: `${bannerImgUrl}/desktop/img/footer/vpb.png`
		},
		{
			name: "MOMO",
			img: `${bannerImgUrl}/desktop/img/footer/momo.png`
		}
	]
};

const FollowUsSection = ({ t, langId, currencyId }) => {
	const { socialChannel } = useGetSocialChannel({
		langId,
		currencyId: currencyId ?? langAndCurrMapping[langId],
		displayPage: defDisplayPage.Footer
	});

	const snsArr = socialChannel?.map(el => (
		<a
			key={`channel-${el.channelName}`}
			href={el.link}
			target="_blank"
			rel="noreferrer"
		>
			<img
				src={`${bannerImgUrl}/desktop/img/${
					footerImgName[el.channelName]
				}`}
				alt={el.title}
			/>
		</a>
	));

	const getPaymentList = () =>
		paymentList[GetCurrencyName({ langId, currencyId, t })] ??
		paymentList.MYR;

	const paymentArr = getPaymentList()?.map(_p => (
		<a key={_p.name}>
			<img src={_p.img} alt={_p.name} />
		</a>
	));

	return (
		<div className="sfp">
			{socialChannel?.length > 0 && (
				<div>
					<div className="title">{t("lbl_Follow_Us")}</div>
					<div>{snsArr}</div>
				</div>
			)}
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
	currencyId: PropTypes.number,
	langId: PropTypes.string.isRequired
};

export default FollowUsSection;
