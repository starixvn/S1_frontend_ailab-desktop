import React, { useContext, useState } from "react";
import { navigate } from "@reach/router";
import path from "../../router";
import productList from "../../datas/productList";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import config from "../../config";

const defPlatfrom = [
	{
		...productList.sports,
		path: path.sports.root,
		parameter: { ...productList.sports },
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
		...productList.casino_JOKER,
		path: path.casino.root,
		parameter: { ...productList.casino_JOKER },
		imgName: "jk"
	},
	{
		...productList.casino_GPI,
		path: path.casino.root,
		parameter: { ...productList.casino_GPI },
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
		...productList.casino_YGG,
		path: path.casino.root,
		parameter: { ...productList.casino_YGG },
		imgName: "yg"
	},
	{
		...productList.casino_PP,
		path: path.casino.root,
		parameter: { ...productList.casino_PP },
		imgName: "pp"
	},
	{
		...productList.casino_SG,
		path: path.casino.root,
		parameter: { ...productList.casino_SG },
		imgName: "sg"
	},
	{
		...productList.casino_PG,
		path: path.casino.root,
		parameter: { ...productList.casino_PG },
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
		...productList.cockFighting,
		imgName: "awc"
	},
	{
		...productList.casino_CQ9,
		path: path.casino.root,
		parameter: { ...productList.casino_CQ9 },
		imgName: "cq9"
	},
	{
		...productList.casino_ICG,
		path: path.casino.root,
		parameter: { ...productList.casino_ICG },
		imgName: "icg"
	},
	{
		...productList.poker,
		imgName: "1g"
	}
	// {
	// 	...productList.kiss918,
	// 	path: path["918kiss"].root,
	// 	imgName:'kiss'
	// }
];

const useHandleLogoList = () => {
	const [onMouseOverImg, setOnMouseOverImg] = useState({});

	const handleOnMouseOverImg = imgName => {
		setOnMouseOverImg(imgName);
	};

	return { onMouseOverImg, handleOnMouseOverImg };
};

export default ({ langId, isLogin }) => {
	const { setPopBox } = useContext(popBoxContext);
	const { onMouseOverImg, handleOnMouseOverImg } = useHandleLogoList();

	const ClickItem = ({ path: _path, urlParams, tpId, gameId, needLogin }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path) {
			return needLogin && !isLogin
				? loginCallback()
				: navigate(`/${langId}/${_path}${urlParams}`);
		}
		SET_ENTER_PAGE({
			isLogin,
			langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const rows = defPlatfrom.map(p => {
		const key = `footer-platform-${p.tpId}-${p.gameId}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(_key => {
				return `${_key}=${p.parameter[_key]}`;
			});
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		const imgName =
			onMouseOverImg === p.imgName ? `${p.imgName}a` : p.imgName;
		return (
			<button
				className={imgName}
				key={key}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}>
				<img
					src={`${config.cloudImgUrl}/SiteSkin/img/logo/${imgName}.png`}
					name={imgName}
					alt={`logo ${imgName}`}
					onMouseOver={handleOnMouseOverImg.bind(this, p.imgName)}
					onMouseOut={handleOnMouseOverImg.bind(this, "")}
					onBlur={() => 0}
					onFocus={() => 0}
				/>
			</button>
		);
	});
	return <div className="platform">{rows}</div>;
};
