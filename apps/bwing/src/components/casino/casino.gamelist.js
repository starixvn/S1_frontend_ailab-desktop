import React, { useContext } from "react";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defRowsPerPage } from "./casino.def";
import { defPopBoxType } from "../common/defPopBoxType";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";
import useDelayFunc from "../hook/useDelayFunc";
import { defCasinoProviders, defTpGameType } from "../../datas/productList";
import { useInView } from "../hook/useInView";

const GameList = ({
	displayGames,
	imgUrl,
	langId,
	isLogin,
	tpList,
	currentPage,
	favorite,
	onSetFavorite,
	t,
	maintainList,
	onLoadMore
}) => {
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { throttle } = useDelayFunc();
	const { setPopBox } = useContext(popBoxContext);
	const startIdx = 0;
	const endIdx = currentPage * defRowsPerPage;
	const inViewRef = useInView(() => onLoadMore());

	const onClickPlay = ({ tpId, gameId, isFree, delay, tpGameType }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isLogin || isFree) {
			throttle(
				() =>
					SET_CASINO_ENTER_PAGE({
						tpId,
						gameId,
						isFree,
						langId,
						execFunction:
							tpId === defSpecialSetting.playTech
								? handleGoToGame.bind(this, {
										langId,
										tpId,
										gameId,
										isFun: isFree,
										tpGameType
								  })
								: null,
						tpGameType
					}),
				delay
			);
		} else loginCallback();
	};

	let _imgUrl = "";
	const rows = displayGames
		?.filter(g => tpList[g.tpId] !== undefined)
		.slice(startIdx, endIdx)
		.map(g => {
			const tpInfo = tpList[g.tpId];
			const imgName = g.imgName[langId]
				? g.imgName[langId]
				: g.imgName.en;
			const gameDisplayName = g.name[langId] ? g.name[langId] : g.name.en;
			const isFavorite =
				favorite?.filter(f => {
					const fArr = f.split("_");
					const _tpId = fArr[0];
					fArr?.shift();
					const _gameId = fArr.join("_");
					return Number(_tpId) === g.tpId && _gameId === g.gameId;
				})?.length > 0;

			_imgUrl = `${imgUrl}/${g.tpName}/${imgName}`;

			const { tpGameType = null } =
				Object.values(defCasinoProviders).find(
					obj => obj.tpId === g.tpId
				) ?? {};

			const isInMaintain = maintainList?.some(
				item =>
					item.tpId === g.tpId &&
					(item.tpGameType === tpGameType ||
						item.tpGameType === defTpGameType.All)
			);

			return (
				<div
					className={isInMaintain ? "under" : ""}
					key={`casino-game-${g.tpId}-${g.gameId}`}>
					{isInMaintain ? (
						<div className="underBtn">
							{t("lbl_underMaintenance")}
						</div>
					) : null}
					<div className="brand">
						<span>{tpInfo.displayText}</span>
					</div>
					{g.new ? <div className="newTag">NEW</div> : null}
					<div
						onClick={onSetFavorite.bind(this, g.tpId, g.gameId)}
						className={`icon icon-star-full${
							isFavorite ? " active" : ""
						}`}
					/>
					<img alt="Casino_tpInfo" src={_imgUrl} />
					<div className="txt-blue15">{gameDisplayName}</div>
					{!isInMaintain && (
						<div className="btnGroupBg">
							<div className="btnGroup">
								<button
									className="orange"
									onClick={() =>
										onClickPlay({
											tpId: g.tpId,
											gameId: g.gameId,
											isFree: false,
											delay: 5000,
											tpGameType
										})
									}>
									{t("lbl_Play").toUpperCase()}
								</button>
								{g.playFree ? (
									<button
										className="blueBorder"
										onClick={() =>
											onClickPlay({
												tpId: g.tpId,
												gameId: g.gameId,
												isFree: true,
												delay: 0,
												tpGameType
											})
										}>
										{t("lbl_Demo").toUpperCase()}
									</button>
								) : null}
							</div>
						</div>
					)}
				</div>
			);
		});

	return rows && rows.length > 0 ? (
		<div className="slotList">
			{rows}
			<span ref={inViewRef} />
		</div>
	) : (
		<div className="nodata">{t("msg_NoData")}</div>
	);
};

GameList.propTypes = {
	displayGames: PropTypes.arrayOf(PropTypes.any).isRequired,
	imgUrl: PropTypes.string.isRequired,
	langId: PropTypes.string.isRequired,
	isLogin: PropTypes.bool.isRequired,
	tpList: PropTypes.objectOf(PropTypes.any).isRequired,
	currentPage: PropTypes.number.isRequired,
	favorite: PropTypes.arrayOf(PropTypes.any).isRequired,
	onSetFavorite: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	onLoadMore: PropTypes.func.isRequired
};

export default GameList;
