import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import productList, { defTpGameType } from "../../datas/productList";
import { defPopBoxType } from "../common/defPopBoxType";
import { bannerImgUrl } from "../../config";

import {
	GET_OPEN_RULE,
	_ACTION_TYPE,
	OPEN_IN_BLANK,
	SET_ENTER_PAGE,
	SET_CASINO_ENTER_PAGE
} from "../../service/enterPage";

const defGameType = {
	default: "default",
	casino: "casino"
};

const defGameBtnList = [
	{
		displayKey: "lbl_Sports",
		path: path.sports.root,
		productInfo: productList.soccer,
		className: "icon"
	},
	{
		displayKey: "lbl_Games",
		path: path.games.root,
		className: "icon games"
	},
	{
		displayKey: "lbl_Slots",
		path: path.casino.root,
		className: "icon slot"
	},
	{
		displayKey: "lbl_LiveCasino",
		path: path.liveCasino.root,
		className: "icon live"
	},
	{
		displayKey: "lbl_Fishing",
		path: path.fishing.root,
		className: "icon fish"
	},
	{
		displayKey: "lbl_eSports",
		path: path.sports.root,
		productInfo: productList.eSport,
		className: "icon esport"
	}
];

const defMainGameList = [
	{
		...productList.One789_lottery_789,
		displayKey: "lbl_789Lottery",
		img: `${bannerImgUrl}/desktop/img/maingame/789lottery.png`,
		gameType: defGameType.default
	},
	{
		...productList.liveCasino_One789,
		displayKey: "lbl_liveCasino_789SeDie",
		img: `${bannerImgUrl}/desktop/img/maingame/789se.png`,
		gameType: defGameType.default
	},
	{
		...productList.sabaClub,
		displayKey: "lbl_Vgaming",
		img: `${bannerImgUrl}/desktop/img/maingame/vgaming.png`,
		gameType: defGameType.default
	},
	{
		...productList.sportSaba,
		subPath: path.sports.root,
		displayKey: "lbl_VirtualSport",
		img: `${bannerImgUrl}/desktop/img/maingame/virtual.png`,
		gameType: defGameType.default,
		parameter: { ...productList.virtualSports }
	},
	{
		...productList.keno,
		displayKey: "lbl_Keno",
		img: `${bannerImgUrl}/desktop/img/maingame/sabakeno.png`,
		gameType: defGameType.default
	}
];

const getUrl = (preUrl, info) =>
	`/${preUrl}${info ? `?game=${info.name}` : ""}`;

const Content = ({ t, userInfo, setPopBox, allMaintainList }) => {
	const { langId, isLogin } = userInfo;

	const openLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const gameBtnNavigate = ({ _path, productInfo }) => {
		let rule = {};

		if (productInfo) {
			rule = GET_OPEN_RULE(langId, productInfo.tpId, productInfo.gameId);
		}

		const isBlank = rule.actionType === _ACTION_TYPE.blank;
		const needLogin = rule.needLogin && isLogin === false;

		if (needLogin)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});

		if (isBlank) return OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey);

		const _url = getUrl(`${langId}/${_path}`, productInfo);

		navigate(_url);
		return rule;
	};

	const mainGameNavigate = ({
		tpId,
		gameId,
		isInMaintain,
		gameType,
		_subPath
	}) => {
		if (isInMaintain) return;

		if (_subPath) {
			navigate(`/${userInfo.langId}/${_subPath}`);
		} else if (gameType === defGameType.default) {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback: openLoginPopBox
			});
		} else if (gameType === defGameType.casino) {
			if (userInfo.isLogin === false) {
				openLoginPopBox();
			}
			SET_CASINO_ENTER_PAGE({
				tpId,
				gameId,
				isFree: false,
				langId: userInfo.langId
			});
		}
	};

	return (
		<MainGame
			t={t}
			langId={langId}
			gameBtnList={defGameBtnList}
			mainGameList={defMainGameList}
			allMaintainList={allMaintainList}
			gameBtnNavigate={gameBtnNavigate}
			mainGameNavigate={mainGameNavigate}
		/>
	);
};

Content.defaultProps = {
	allMaintainList: null
};

Content.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	setPopBox: PropTypes.func.isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.number)
};

export default Content;

const MainGame = ({
	t,
	gameBtnList,
	mainGameList,
	allMaintainList,
	gameBtnNavigate,
	mainGameNavigate
}) => (
	<>
		<div className="gameBtn ">
			{gameBtnList.map(item => (
				// eslint-disable-next-line jsx-a11y/anchor-is-valid
				<a
					key={item.displayKey}
					onClick={() =>
						gameBtnNavigate({
							_path: item.path,
							productInfo: item.productInfo
						})
					}
				>
					<div>
						<div className={item.className} />
					</div>
					<p>{String(t(item.displayKey)).toUpperCase()}</p>
				</a>
			))}
		</div>
		<div className="maingame">
			{mainGameList.map(
				({
					tpId,
					gameId,
					displayKey,
					img,
					gameType,
					subPath,
					parameter,
					tpGameType
				}) => {
					const isInMaintain = allMaintainList?.some(
						item =>
							item.tpId === tpId &&
							(item.tpGameType === tpGameType ||
								item.tpGameType === defTpGameType.All)
					);
					let _subPath;

					if (subPath) {
						if (
							gameId === productList.sportSaba.gameId &&
							tpId === productList.sportSaba.tpId
						) {
							_subPath = `${subPath}?game=${parameter?.name}`;
						} else {
							_subPath = `${s.subPath}`;
						}
					}

					return (
						// eslint-disable-next-line jsx-a11y/anchor-is-valid
						<a
							className={isInMaintain ? "under" : ""}
							key={displayKey}
							onClick={() =>
								mainGameNavigate({
									tpId,
									gameId,
									isInMaintain,
									gameType,
									_subPath
								})
							}
						>
							<img src={img} alt="" />
							<div className="title">{t(displayKey)}</div>
							{isInMaintain && (
								<div className="underBtn">
									{t("lbl_underMaintenance")}
								</div>
							)}
						</a>
					);
				}
			)}
		</div>
	</>
);

MainGame.propTypes = {
	t: PropTypes.func.isRequired,
	gameBtnList: PropTypes.arrayOf(PropTypes.any).isRequired,
	mainGameList: PropTypes.arrayOf(PropTypes.any).isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	gameBtnNavigate: PropTypes.func.isRequired,
	mainGameNavigate: PropTypes.func.isRequired
};
