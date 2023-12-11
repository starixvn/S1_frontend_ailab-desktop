import React from "react";
import PropTypes from "prop-types";
import { useInView } from "../hook/useInView";

const GameList = ({
	displayGames,
	imgUrl,
	langId,
	providerList,
	onSetFavorite,
	t,
	onLoadMore,
	onClickPlay,
	filterJudge,
	startIdx,
	endIdx,
	getIsInMaintain,
	getTpGameType,
	activeCategory,
	favoriteStr
}) => {
	const inViewRef = useInView(() => onLoadMore());
	let _imgUrl = "";
	const rows =
		displayGames &&
		displayGames
			?.filter(g => filterJudge(g))
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

				const _className = [getIsInMaintain(g) && "active"]
					.filter(Boolean)
					.join(" ");

				const _style = {
					pointerEvents: getIsInMaintain(g) ? "none" : "auto"
				};

				return (
					<div
						className={_className}
						style={_style}
						key={`casino-game-${g.tpId}-${g.gameId}`}
					>
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
								}
							>
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
									}
								>
									{t("lbl_Demo")}
								</button>
							) : null}
						</div>
						<div className="under">{t("lbl_underMaintenance")}</div>
					</div>
				);
			});
	return rows && rows.length > 0 ? (
		<div className="slotList">
			{rows}
			<span ref={inViewRef} />
		</div>
	) : (
		<div className="nodata icon icon-nodata">
			<div>{t("lbl_NoData")}</div>
		</div>
	);
};

GameList.defaultProps = {
	displayGames: null,
	providerList: null,
	langId: null,
	onSetFavorite: () => null,
	t: () => null,
	onLoadMore: () => null,
	onClickPlay: () => null,
	filterJudge: () => null,
	startIdx: null,
	endIdx: null,
	getIsInMaintain: () => null,
	getTpGameType: () => null,
	activeCategory: null
};

GameList.propTypes = {
	displayGames: PropTypes.arrayOf(PropTypes.any),
	providerList: PropTypes.arrayOf(PropTypes.any),
	imgUrl: PropTypes.string.isRequired,
	langId: PropTypes.string,
	onSetFavorite: PropTypes.func,
	t: PropTypes.func,
	onLoadMore: PropTypes.func,
	onClickPlay: PropTypes.func,
	filterJudge: PropTypes.func,
	startIdx: PropTypes.number,
	endIdx: PropTypes.number,
	getIsInMaintain: PropTypes.func,
	getTpGameType: PropTypes.func,
	activeCategory: PropTypes.string,
	favoriteStr: PropTypes.string.isRequired
};

export default GameList;
