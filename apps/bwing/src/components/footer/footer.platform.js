import React, { useContext } from "react";
import { navigate } from "@reach/router";
import path from "../../router";
import productList, { defCasinoProviders } from "../../datas/productList";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";

const defPlatform = [
	{
		...productList.sabaClub,
		path: path.sports.root,
		parameter: { game: "soccer" },
		imgName: "saba"
	},
	{
		...productList.liveCasino_Allbet,
		imgName: "ab"
	},
	// {
	// 	...productList.fishing,
	// 	imgName: "yl"
	// },
	{
		...productList.liveCasino_AG,
		imgName: "ag"
	},
	{
		...defCasinoProviders.GPI,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.GPI.name },
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
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.YGG.name },
		imgName: "yg"
	},
	{
		...defCasinoProviders.PP,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PP.name },
		imgName: "pp"
	},
	{
		...defCasinoProviders.SG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SG.name },
		imgName: "sg"
	},
	{
		...defCasinoProviders.PG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PG.name },
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
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.CQ9.name },
		imgName: "cq9"
	},
	{
		...productList.liveCasino_One789,
		imgName: "one789"
	},
	{
		...defCasinoProviders.ICG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.ICG.name },
		imgName: "icg"
	},
	{
		...productList.V8_Poker,
		imgName: "v8"
	},
	{
		...productList.N2_Live,
		imgName: "n2live"
	}
];

export default ({ langId, isLogin, productTpIds }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickItem = ({ path: _path, urlParams, tpId, gameId }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path) {
			navigate(`/${langId}/${_path}${urlParams}`);
		} else {
			SET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback
			});
		}
	};

	const filterPlatform = defPlatform.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);

	const showRows = isLogin ? filterPlatform : defPlatform;

	const rows = showRows.map(p => {
		const key = `footer-platform-${p.imgName}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(_key => {
				return `${_key}=${p.parameter[_key]}`;
			});
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";

		return (
			<button
				key={key}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}>
				<img
					alt="logo"
					src={`${config.imgUrl}/common/images/logo/${p.imgName}.png`}
				/>
			</button>
		);
	});

	return <div className="platformGroup">{rows}</div>;
};
