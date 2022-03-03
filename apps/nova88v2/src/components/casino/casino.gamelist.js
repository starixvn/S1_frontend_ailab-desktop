import React, { useContext } from "react";
import { popBoxContext } from "../common/context";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defRowsPerPage } from "./casino.def";
import defPopBoxType from "../common/defPopBoxType";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";
import useDelayFunc from "../hook/useDelayFunc";
import { defSlotTpGameType, defTpGameType } from "../../datas/productList";
import { useInView } from "../hook/useInView";

export default ({
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

	const onClickPlay = ({
		tpId,
		gameId,
		isFree,
		delay,
		isInMaintain,
		tpGameType
	}) => {
		if (isInMaintain) {
			return;
		}

		const loginCallback = () =>
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});

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
				Object.values(defSlotTpGameType).find(
					obj => obj.tpId === g.tpId
				) ?? {};

			const isInMaintain = maintainList?.some(
				item =>
					item.tpId === g.tpId &&
					(item.tpGameType === tpGameType ||
						item.tpGameType === defTpGameType.All)
			);

			const _className = [isInMaintain && "active"]
				.filter(Boolean)
				.join(" ");

			const _style = {
				pointerEvents: isInMaintain ? "none" : "auto"
			};

			return (
				<div
					className={_className}
					style={_style}
					key={`casino-game-${g.tpId}-${g.gameId}`}>
					<div className="brand">
						<span>{tpInfo.displayText}</span>
					</div>

					<div className={`icon ${g.new ? "icon-new" : ""}`} />

					<img alt="Casino_tpInfo" src={_imgUrl} />

					<div className="txt-darkBlue">
						<div>{gameDisplayName}</div>
						<div
							onClick={onSetFavorite.bind(this, g.tpId, g.gameId)}
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
									isInMaintain,
									tpGameType
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
										isInMaintain,
										tpGameType
									})
								}>
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
