import React from "react";
import PropTypes from "prop-types";
import productList, { defCasinoProviders } from "../../../datas/productList";
import config from "../../../config";

const defPlatform = [
	{
		...productList.sabaClub,
		imgName: "saba"
	},
	{
		...productList.liveCasino_Allbet,
		imgName: "ab"
	},
	{
		...productList.fishing,
		imgName: "yl"
	},
	{
		...productList.liveCasino_AG,
		imgName: "ag"
	},
	{
		...defCasinoProviders.GPI,
		imgName: "gp"
	},
	{
		...productList.liveCasino_DG,
		imgName: "dg"
	},
	{
		...productList.liveCasino_SA,
		imgName: "sa"
	},
	{
		...defCasinoProviders.YGG,
		imgName: "yg"
	},
	{
		...defCasinoProviders.PP,
		imgName: "pp"
	},
	{
		...defCasinoProviders.SG,
		imgName: "sg"
	},
	{
		...defCasinoProviders.PG,
		imgName: "pg"
	},
	{
		...productList.liveCasino_AE,
		imgName: "ae"
	},
	{
		...productList.liveCasino_eBET,
		imgName: "eb"
	},
	{
		...productList.liveCasino_WM,
		imgName: "wm"
	},
	{
		...defCasinoProviders.CQ9,
		imgName: "cq9"
	},
	{
		...defCasinoProviders.ICG,
		imgName: "icg"
	},
	{
		...productList.V8_Poker,
		imgName: "v8"
	},
	{
		...productList.liveCasino_n2live,
		imgName: "n2live"
	},
	{
		...defCasinoProviders.PT,
		imgName: "playtech"
	},
	{
		...productList.sportBti,
		imgName: "bti"
	}
];

const Platform = ({ isLogin, productTpIds }) => {
	const filterPlatform = defPlatform.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);
	const showRows = isLogin ? filterPlatform : defPlatform;

	const rows = showRows.map(item => {
		return (
			<button key={`platform-${item.imgName}`}>
				<img
					alt="logo"
					src={`${config.imgUrl}/common/images/logo/${item.imgName}.png`}
				/>
			</button>
		);
	});

	return (
		<div className="platform">
			<div>{rows}</div>
		</div>
	);
};

Platform.defaultProps = {
	productTpIds: []
};

Platform.propTypes = {
	isLogin: PropTypes.bool.isRequired,
	productTpIds: PropTypes.arrayOf(PropTypes.number)
};

export default Platform;
