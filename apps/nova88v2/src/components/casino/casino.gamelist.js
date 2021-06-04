import React, { useContext } from "react";
import { popBoxContext } from "../common/context";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defRowsPerPage } from "./casino.def";
import defPopBoxType from "../common/defPopBoxType";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";
import useDelayFunc from "../hook/useDelayFunc";

export default ({
	displayGames,
	imgUrl,
	langId,
	isLogin,
	tpList,
	currentPage,
	favorite,
	onSetFavorite,
	t
}) => {
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { throttle } = useDelayFunc();
	const { setPopBox } = useContext(popBoxContext);
	const startIdx = (currentPage - 1) * defRowsPerPage;
	const endIdx = currentPage * defRowsPerPage;

	const onClickPlay = ({ tpId, gameId, isFree, delay }) => {
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
										isFun: isFree
								  })
								: null
					}),
				delay
			);
		} else
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
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
					return Number(fArr[0]) === g.tpId && fArr[1] === g.gameId;
				})?.length > 0;

			_imgUrl = `${imgUrl}/${g.tpName}/${imgName}`;

			return (
				<div key={`casino-game-${g.tpId}-${g.gameId}`}>
					<div className="brand">
						<span>{tpInfo.displayText}</span>
					</div>
					<div className={`icon ${g.new ? "icon-new" : ""}`} />

					<div
						onClick={onSetFavorite.bind(this, g.tpId, g.gameId)}
						className={`icon icon-star-full${
							isFavorite ? " active" : ""
						}`}
					/>
					<img alt="Casino_tpInfo" src={_imgUrl} />
					<div className="txt-darkBlue">{gameDisplayName}</div>
					<div className="btnGroup">
						<button
							className="blue"
							onClick={() =>
								onClickPlay({
									tpId: g.tpId,
									gameId: g.gameId,
									isFree: false,
									delay: 5000
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
										delay: 0
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
		<div className="slotList">{rows}</div>
	) : (
		<div className="nodata icon icon-nodata">
			<div>{t("lbl_NoData")}</div>
		</div>
	);
};
