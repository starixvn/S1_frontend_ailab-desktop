import React, { useState } from "react";
import PropTypes from "prop-types";
import productList, { defCasinoProviders } from "../../datas/productList";
import config from "../../config";

const defPlatform = [
	{
		...productList.sabaClub,
		imgName: "saba"
	},
	// {
	// 	...productList.sportBti,
	// 	imgName: "bti"
	// },
	{
		...productList.liveCasino_AG,
		imgName: "ag"
	},
	{
		...productList.liveCasino_AE,
		imgName: "ae"
	},
	{
		...productList.liveCasino_n2live,
		imgName: "n2live"
	},
	{
		...defCasinoProviders.PP,
		imgName: "pp"
	},
	{
		...defCasinoProviders.MGPSW,
		imgName: "mg"
	},
	{
		...defCasinoProviders.PT,
		imgName: "playtech"
	},
	{
		...defCasinoProviders.PG,
		imgName: "pg"
	},
	{
		...defCasinoProviders.SG,
		imgName: "sg"
	},
	{
		...defCasinoProviders.YGG,
		imgName: "yg"
	},
	{
		...defCasinoProviders.CQ9,
		imgName: "cq9"
	},

	{
		...defCasinoProviders.JILI,
		imgName: "jili"
	},
	{
		...productList.fishing,
		imgName: "yl"
	},
	{
		...productList.V8_Poker,
		imgName: "v8"
	},
	{
		...productList.KingMaker,
		imgName: "kingmaker"
	},
	{
		...productList.tcg,
		imgName: "tcg"
	}
];

const Platform = ({ isLogin, productTpIds }) => {
	const [hoverNamme, setHoverNamme] = useState(null);
	const handleHoverImg = _hoverName => {
		setHoverNamme(_hoverName);
	};

	const filterPlatform = defPlatform.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);
	const showRows = isLogin ? filterPlatform : defPlatform;

	const rows = showRows.map(item => {
		return (
			<button key={`platform-${item.imgName}`}>
				<img
					alt="logo"
					src={`${config.imgUrl}/common/images/logo/${item.imgName}${
						hoverNamme === item.imgName ? "a" : ""
					}.png`}
					onMouseOver={handleHoverImg.bind(this, item.imgName)}
					onMouseOut={handleHoverImg.bind(this, null)}
					onBlur={() => 0}
					onFocus={() => 0}
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
