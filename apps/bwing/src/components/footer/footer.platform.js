import React, { useContext } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
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
		...productList.sportSbo,
		path: path.sportSbo.root,
		imgName: "sbobet"
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
	},
	{
		...defCasinoProviders.RedTiger,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.RedTiger.name },
		imgName: "red"
	},
	{
		...defCasinoProviders.NetEnt,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.NetEnt.name },
		imgName: "ne"
	},
	{
		...defCasinoProviders.AdvantPlay,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.AdvantPlay.name },
		imgName: "ap"
	},
	{
		...productList.liveCasino_EVO,
		imgName: "ev"
	},
	{
		...defCasinoProviders.Habanero,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.Habanero.name },
		imgName: "ho"
	},
	{
		...defCasinoProviders.SimplePlay,
		path: path.casino.root,
		parameter: { provider: defCasinoProviders.SimplePlay.name },
		imgName: "sp"
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

const Platform = ({ langId, isLogin, productTpIds, maintainList }) => {
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
			params = Object.keys(p.parameter).map(
				_key => `${_key}=${p.parameter[_key]}`
			);
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";

		const isInMaintain = maintainList?.some(
			item =>
				item.tpId === p.tpId &&
				(item.tpGameType === p.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		return (
			<button
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

Platform.defaultProps = {
	langId: null,
	isLogin: null,
	productTpIds: null,
	maintainList: null
};

Platform.propTypes = {
	langId: PropTypes.string,
	isLogin: PropTypes.bool,
	productTpIds: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any)
};

export default Platform;
