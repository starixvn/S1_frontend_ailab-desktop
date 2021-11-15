import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import path from "../../router";
import productList from "../../datas/productList";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { cloudImgUrl } from "../../config";

const useHandleLogoList = () => {
	const [onMouseOverImg, setOnMouseOverImg] = useState({});

	const handleOnMouseOverImg = imgName => {
		setOnMouseOverImg(imgName);
	};

	return { onMouseOverImg, handleOnMouseOverImg };
};

const PlatformSection = ({
	langId,
	isLogin,
	productTpIds,
	currencyId,
	currencyCode
}) => {
	const defPlatfrom = [
		{
			...productList.sports,
			path: path.sports.root,
			parameter: { ...productList.sports },
			imgName: "saba",
			hoverImgName: "sabab"
		},
		{
			...productList.liveCasino_Allbet,
			imgName: "ab",
			hoverImgName: "aba"
		},
		{
			...productList.liveCasino_DG,
			imgName: "dg",
			hoverImgName: "dga"
		},
		{
			...productList.liveCasino_AG,
			imgName: "ag",
			hoverImgName: "aga"
		},
		{
			...productList.liveCasino_AE,
			imgName: "ae",
			hoverImgName: "aea"
		},
		{
			...productList.liveCasino_SA,
			imgName: "sa",
			hoverImgName: "saa"
		},
		{
			...productList.casino_PP,
			path: path.casino.root,
			parameter: { ...productList.casino_PP },
			imgName: "pp",
			hoverImgName: "ppa"
		},
		{
			...productList.casino_MGPSW,
			path: path.casino.root,
			parameter: { ...productList.casino_MGPSW },
			imgName: "mg",
			hoverImgName: "mga"
		},
		{
			...productList.casino_PT,
			path: path.casino.root,
			parameter: { ...productList.casino_PT },
			imgName: "pt",
			hoverImgName: "pta"
		},
		{
			...productList.casino_YGG,
			path: path.casino.root,
			parameter: { ...productList.casino_YGG },
			imgName: "yg",
			hoverImgName: "yga"
		},
		{
			...productList.casino_JOKER,
			path: path.casino.root,
			parameter: { ...productList.casino_JOKER },
			imgName: "jk",
			hoverImgName: "jka"
		},
		{
			...productList.casino_SG,
			path: path.casino.root,
			parameter: { ...productList.casino_SG },
			imgName: "sg",
			hoverImgName: "sga"
		},
		{
			...productList.casino_JILI,
			path: path.casino.root,
			parameter: { ...productList.casino_JILI },
			imgName: "ji",
			hoverImgName: "jia"
		},
		{
			...productList.tcg,
			parameter: { ...productList.tcg },
			imgName: "tc",
			hoverImgName: "tcb"
		},
		{
			...productList.casino_RedTiger,
			path: path.casino.root,
			parameter: { ...productList.casino_RedTiger },
			imgName: "rt",
			hoverImgName: "rta"
		},
		{
			...productList.casino_NetEnt,
			path: path.casino.root,
			parameter: { ...productList.casino_NetEnt },
			imgName: "nt",
			hoverImgName: "nta"
		},
		{
			...productList.liveCasino_EVO,
			imgName: "ev",
			hoverImgName: "eva"
		}
	];

	const { setPopBox } = useContext(popBoxContext);
	const { onMouseOverImg, handleOnMouseOverImg } = useHandleLogoList();

	const ClickItem = ({
		path: _path,
		urlParams,
		tpId,
		gameId,
		needLogin,
		tpGameType
	}) => {
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
			loginCallback,
			tpGameType
		});
	};

	const filterPlatform = defPlatfrom.filter(
		item => !item.tpId || (item.tpId && productTpIds?.includes(item.tpId))
	);

	const showRows = isLogin ? filterPlatform : defPlatfrom;

	const rows = showRows?.map(p => {
		const key = `footer-platform-${p.tpId}-${p.gameId}`;
		let params = null;
		if (p.parameter) {
			params = Object.keys(p.parameter).map(_key => {
				return `${_key}=${p.parameter[_key]}`;
			});
		}

		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		const imgName =
			onMouseOverImg === p.imgName ? p.hoverImgName : p.imgName;

		return (
			<button
				className={imgName}
				key={key}
				onClick={ClickItem.bind(this, { ...p, urlParams: _urlParams })}>
				<img
					src={`${cloudImgUrl}/SiteSkin/img/logo/${imgName}.png`}
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

PlatformSection.defaultProps = {
	currencyId: null,
	productTpIds: null
};

PlatformSection.propTypes = {
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	productTpIds: PropTypes.arrayOf(PropTypes.any),
	currencyId: PropTypes.number,
	currencyCode: PropTypes.objectOf(PropTypes.any).isRequired
};

export default PlatformSection;
