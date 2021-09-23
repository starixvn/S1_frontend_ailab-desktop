import React, { useContext } from "react";
import { navigate } from "@reach/router";
import path from "../../router";
import productList, {
	defCasinoProviders,
	defTpGameType
} from "../../datas/productList";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";

const defPlatform = [
	{
		...productList.sabaClub,
		path: path.sports.root,
		parameter: { game: "soccer" },
		imgName: "saba"
	},
	{
		...productList.sportBti,
		path: path.sportBti.root,
		imgName: "bti"
	},
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
		imgName: "n2"
	},
	{
		...defCasinoProviders.PP,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PP.name },
		imgName: "pp"
	},
	{
		...defCasinoProviders.MGPSW,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.MGPSW.name },
		imgName: "mg"
	},
	{
		...defCasinoProviders.PT,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PT.name },
		imgName: "pt"
	},
	{
		...defCasinoProviders.PG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.PG.name },
		imgName: "pg"
	},
	{
		...defCasinoProviders.SG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SG.name },
		imgName: "sg"
	},
	{
		...defCasinoProviders.YGG,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.YGG.name },
		imgName: "ygg"
	},
	{
		...defCasinoProviders.CQ9,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.CQ9.name },
		imgName: "cq9"
	},
	{
		...defCasinoProviders.JILI,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.JILI.name },
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
		imgName: "king"
	},
	{
		...productList.tcg,
		imgName: "tc"
	}
	// {
	// 	...productList.liveCasino_Allbet,
	// 	imgName: "ab"
	// },
	// {
	// 	...defCasinoProviders.GPI,
	// 	path: path.casino.root,
	// 	parameter: { provider: defCasinoProviders.GPI.name },
	// 	imgName: "gp"
	// },
	// {
	// 	...productList.liveCasino_DG,
	// 	imgName: "dg"
	// },
	// {
	// 	...productList.liveCasino_SA,
	// 	imgName: "sa"
	// },
	// {
	// 	...productList.liveCasino_eBET,
	// 	imgName: "eb"
	// },
	// {
	// 	...productList.liveCasino_WM,
	// 	imgName: "wm"
	// },

	// {
	// 	...productList.liveCasino_One789,
	// 	imgName: "one789"
	// },
	// {
	// 	...defCasinoProviders.ICG,
	// 	path: path.casino.root,
	// 	parameter: { provider: defCasinoProviders.ICG.name },
	// 	imgName: "icg"
	// }
];

export default ({ langId, isLogin, productTpIds, maintainList }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickItem = ({
		path: _path,
		urlParams,
		tpId,
		gameId,
		isInMaintain,
		tpGameType
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (isInMaintain) {
			return;
		}
		if (_path) {
			navigate(`/${langId}/${_path}${urlParams}`);
		} else if (tpId || gameId) {
			SET_ENTER_PAGE({
				isLogin,
				langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
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

		const isInMaintain = maintainList?.some(
			item =>
				item.tpId === p.tpId &&
				(item.tpGameType === p.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		return (
			<a
				key={key}
				className={p.imgName}
				onClick={ClickItem.bind(this, {
					...p,
					urlParams: _urlParams,
					isInMaintain
				})}
			/>
		);
	});

	return <div className="platformGroup">{rows}</div>;
};
