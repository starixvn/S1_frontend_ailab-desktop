import React, { useContext } from "react";
import { popBoxContext } from "../common/context";
import config from "../../config";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defRowsPerPage } from "./casino.def";
import { defPopBoxType } from "../common/popBox";

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
	const { setPopBox } = useContext(popBoxContext);
	const startIdx = (currentPage - 1) * defRowsPerPage;
	const endIdx = currentPage * defRowsPerPage;

	const onClickPlay = (tpId, gameId, isFree) => {
		if (isLogin) {
			SET_CASINO_ENTER_PAGE(tpId, gameId, isFree);
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		}
	};
	let _imgUrl = "";
	const rows = displayGames
		?.filter(g => tpList[g.tpId] !== undefined)
		.slice(startIdx, endIdx)
		.map(g => {
			const tpInfo = tpList[g.tpId];
			const imgName = g.imgName[langId] ? g.imgName[langId] : g.imgName.en;
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
							onClick={onClickPlay.bind(
								this,
								g.tpId,
								g.gameId,
								false
							)}>
							{t("lbl_PlayNow")}
						</button>
						{g.playFree ? (
							<button
								className="blue"
								onClick={onClickPlay.bind(
									this,
									g.tpId,
									g.gameId,
									true
								)}>
								{t("lbl_Free")}
							</button>
						) : null}
					</div>
					{g.new ? <div className="new-icon">NEW</div> : null}
				</div>
			);
		});

	return rows && rows.length > 0 ? (
		<div className="slotList">{rows}</div>
	) : (
		<div className="nodata">{t("msg_NoData")}</div>
	);
};
