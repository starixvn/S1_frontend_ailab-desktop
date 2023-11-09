import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useInView } from "../hook/useInView";
import { userInfoContext } from "../common/context";
import { bannerImgUrl } from "../../config";

const GameList = ({
	displayGames,
	imgUrl,
	providerList,
	onSetFavorite,
	onLoadMore,
	onClickPlay,
	filterJudge,
	startIdx,
	endIdx,
	getIsInMaintain,
	getTpGameType,
	activeCategory,
	favoriteStr,
	activeProvider
}) => {
	const { t } = useTranslation();
	const {
		userInfo: { langId }
	} = useContext(userInfoContext);
	const inViewRef = useInView(() => onLoadMore());
	let _imgUrl = "";
	const rows =
		displayGames &&
		displayGames
			?.filter(g => filterJudge(g))
			// If have sort in game object then sort when in active provider
			.sort((a, b) => {
				if (
					activeProvider.tpId === a.tpId &&
					activeProvider.tpId === b.tpId
				) {
					return a?.sort > b?.sort ? 1 : -1;
				}
				return true;
			})
			?.slice(startIdx, endIdx)
			?.map(g => {
				const imgName = g.imgName[langId]
					? g.imgName[langId]
					: g.imgName.en;
				const gameDisplayName = g.gameName[langId]
					? g.gameName[langId]
					: g.gameName.en;
				const key = `${g.tpId}_${g.gameId}`;
				const storageStr = favoriteStr ?? "";
				const storageList = storageStr.split("&") ?? [];
				const handleIsFavorite = () => storageList?.includes(key);
				const isFavorite = handleIsFavorite();
				const gameProviderName = providerList.find(
					obj => obj.tpId === g.tpId
				).gameImgDisplayText;

				_imgUrl = `${imgUrl}/${gameProviderName}/${imgName}`;

				const _style = {
					pointerEvents: getIsInMaintain(g) ? "none" : "auto"
				};

				return (
					<div
						className={classNames(
							"slots-list-item "
							// 	{
							// 	active: getIsInMaintain(g)
							// }
						)}
						style={_style}
						key={`casino-game-${g.tpId}-${g.gameId}`}
					>
						<div className="img-wrapper">
							<img src={_imgUrl} alt="" />
							<div className="btn-container">
								<button
									onClick={() =>
										onClickPlay({
											tpId: g.tpId,
											gameId: g.gameId,
											isFree: false,
											delay: 5000,
											isInMaintain: getIsInMaintain(g),
											tpGameType:
												getTpGameType(g).tpGameType
										})
									}
								>
									{t("lbl_Play")}
								</button>

								{g.playFree ? (
									<button
										onClick={() =>
											onClickPlay({
												tpId: g.tpId,
												gameId: g.gameId,
												isFree: true,
												delay: 0,
												isInMaintain:
													getIsInMaintain(g),
												tpGameType:
													getTpGameType(g).tpGameType
											})
										}
									>
										{t("lbl_Demo")}
									</button>
								) : null}
							</div>
						</div>
						<div className="details">
							<div>
								<div>{gameDisplayName}</div>
								<div>{gameProviderName}</div>
							</div>
							<div
								onClick={() => onSetFavorite(g.tpId, g.gameId)}
							>
								<img
									src={`${bannerImgUrl}/desktop/img/4.0/lobby-slots/star-icon${
										isFavorite ? "-active" : ""
									}.png`}
									alt=""
								/>
							</div>
						</div>
						{/*
					<div className="brand">
							<span>{gameProviderName}</span>
						</div>

						<div
							className={`icon ${
								activeCategory === "new" ? "icon-new" : ""
							}`}
						/>

						<img alt="Casino_tpInfo" src={_imgUrl} />

						<div className="txt-darkBlue">
							<div>{gameDisplayName}</div>
							<div
								onClick={onSetFavorite?.bind(
									this,
									g.tpId,
									g.gameId
								)}
								className={`icon icon-star-full${
									isFavorite ? " active" : ""
								}`}
							/>
						</div>

						<div className="btnGroup">
							<button
								className="blue"
								onClick={() =>
									onClickPlay({
										tpId: g.tpId,
										gameId: g.gameId,
										isFree: false,
										delay: 5000,
										isInMaintain: getIsInMaintain(g),
										tpGameType: getTpGameType(g).tpGameType
									})
								}>
								{t("lbl_Play")}
							</button>

							{g.playFree ? (
								<button
									className="blue"
									onClick={() =>
										onClickPlay({
											tpId: g.tpId,
											gameId: g.gameId,
											isFree: true,
											delay: 0,
											isInMaintain: getIsInMaintain(g),
											tpGameType:
												getTpGameType(g).tpGameType
										})
									}>
									{t("lbl_Demo")}
								</button>
							) : null}
						</div>
						<div className="under">{t("lbl_underMaintenance")}</div>
					*/}
					</div>
				);
			});
	return rows && rows.length > 0 ? (
		<div className="slots-list">
			{rows}
			<span ref={inViewRef} />
		</div>
	) : null;
	// <div className="nodata icon icon-nodata">
	// 	<div>{t("lbl_NoData")}</div>
	// </div>
};

GameList.defaultProps = {
	displayGames: null,
	providerList: null,
	onSetFavorite: () => null,
	onLoadMore: () => null,
	onClickPlay: () => null,
	filterJudge: () => null,
	startIdx: null,
	endIdx: null,
	getIsInMaintain: () => null,
	getTpGameType: () => null,
	activeCategory: null,
	activeProvider: null
};

GameList.propTypes = {
	displayGames: PropTypes.arrayOf(PropTypes.any),
	providerList: PropTypes.arrayOf(PropTypes.any),
	imgUrl: PropTypes.string.isRequired,
	onSetFavorite: PropTypes.func,
	onLoadMore: PropTypes.func,
	onClickPlay: PropTypes.func,
	filterJudge: PropTypes.func,
	startIdx: PropTypes.number,
	endIdx: PropTypes.number,
	getIsInMaintain: PropTypes.func,
	getTpGameType: PropTypes.func,
	activeCategory: PropTypes.string,
	favoriteStr: PropTypes.string.isRequired,
	activeProvider: PropTypes.objectOf(PropTypes.any)
};

export default GameList;
