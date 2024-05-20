import React from "react";
import PropTypes from "prop-types";
import { useInView } from "../hook/useInView";
import usePopBox from "../hook/usePopBox";
import { defPopBoxType } from "../common/defPopBoxType";

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
	const { setPopBox } = usePopBox();
	const inViewRef = useInView(() => onLoadMore());
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
				const brandTpName = providerList.find(
					obj => obj.tpId === g.tpId
				).gameImgDisplayText;

				const imageUrl = `${imgUrl}/${brandTpName}/${imgName}`;

				const _style = {
					pointerEvents: getIsInMaintain(g) ? "none" : "auto"
				};

				const openSlotProductPopBox = () => {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Modal,
						content: (
							<div id="popup" className="popup slotspop active">
								<div className="slotspop-item">
									<button
										className="icon-close-slots"
										onClick={() =>
											setPopBox({ isOpen: false })
										}
									/>
									<div className="slotspop-img">
										<img
											src={imageUrl}
											alt="slot-game-img"
										/>
										<div className="slotspop-btn">
											<button
												onClick={() =>
													onClickPlay({
														tpId: g.tpId,
														gameId: g.gameId,
														isFree: false,
														delay: 100,
														isInMaintain:
															getIsInMaintain(g),
														tpGameType:
															getTpGameType(g)
																.tpGameType
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
																getIsInMaintain(
																	g
																),
															tpGameType:
																getTpGameType(g)
																	.tpGameType
														})
													}
												>
													{t("lbl_Demo")}
												</button>
											) : null}
										</div>
									</div>
									<div className="slotspop-name">
										<span>{gameDisplayName}</span>
									</div>
								</div>
							</div>
						)
					});
				};

				const slotProductItemStyle = () => {
					if (getIsInMaintain(g)) {
						if (newGamesArr.includes(g.gameId)) {
							return "tag-new maintain";
						}

						return "maintain";
					}

					if (newGamesArr.includes(g.gameId)) {
						return "tag-new";
					}
					return "";
				};

				return (
					<div
						className={`slots-products-item ${slotProductItemStyle()}`}
						style={_style}
						key={`casino-game-${g.tpId}-${g.gameId}`}
						onClick={openSlotProductPopBox}
					>
						<button
							className={`${
								isFavorite
									? "icon-fav-solid"
									: "icon-fav-outline"
							}`}
							onClick={onSetFavorite?.bind(
								this,
								g.tpId,
								g.gameId
							)}
						/>

						<img alt="Casino_tpInfo" src={imageUrl} />

						<div className="name" onClick={openSlotProductPopBox}>
							<span>{gameDisplayName}</span>
						</div>
						{getIsInMaintain(g) ? (
							<div className="tag-maintain">
								{t("lbl_underMaintenance")}
							</div>
						) : null}
					</div>
				);
			});
	return rows && rows.length > 0 ? (
		<div className="slots-products">
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
