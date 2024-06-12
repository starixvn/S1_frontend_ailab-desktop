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
	favoriteStr,
	activeProvider,
	newGamesArr
}) => {
	const inViewRef = useInView(() => onLoadMore());
	let _imgUrl = "";
	const rows =
		displayGames &&
		displayGames
			?.filter(g => filterJudge(g))
			.sort(() => Math.random() - 0.5) // 隨機排列遊戲列表
			// 次早：原先為按照發佈時間順序排列：
			// .sort((a, b) => {
			// 	return (
			// 		new Date(b.launchDate).getTime() -
			// 		new Date(a.launchDate).getTime()
			// 	);

			// 最早：原始的排序方式（先保留以防ＰＭ需改回）
			// if (
			// 	activeProvider.tpId === a.tpId &&
			// 	activeProvider.tpId === b.tpId
			// ) {
			// 	return a?.sort > b?.sort ? 1 : -1;
			// }
			// return true;
			// })
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
						className={getIsInMaintain(g) ? "active" : ""}
						style={_style}
						key={`casino-game-${g.tpId}-${g.gameId}`}>
						{getIsInMaintain(g) ? (
							<div className="maintenance">
								{t("lbl_underMaintenance")}
							</div>
						) : null}
						<div className="brand">
							<span>{gameProviderName}</span>
						</div>

						<div
							className={`icon ${
								newGamesArr?.includes(g.gameId)
									? "icon-new"
									: ""
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
								className="yellow"
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
	activeCategory: null,
	activeProvider: null,
	newGamesArr: null
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
	favoriteStr: PropTypes.string.isRequired,
	activeProvider: PropTypes.objectOf(PropTypes.any),
	newGamesArr: PropTypes.arrayOf(PropTypes.string)
};

export default GameList;
