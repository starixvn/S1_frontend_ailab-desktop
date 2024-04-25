import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { maintainListContext } from "../common/context";
import { defTpGameType } from "../../datas/productList";
import useClickLobbyGamesItem from "./hooks/useClickItem";

const LobbyListItem = ({ subMenuItem }) => {
	const { displayText, displayKey, tpId, gameId, lobbyItemSrc, tpGameType } =
		subMenuItem;
	const { allMaintainList } = useContext(maintainListContext);
	const clickLobbyGame = useClickLobbyGamesItem();
	const { t } = useTranslation();
	const _displayText = displayText || t(displayKey);
	const isInMaintain = allMaintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	return (
		<div className={isInMaintain ? "lobby-item under" : "lobby-item"}>
			<div className="lobby-item-img">
				{subMenuItem?.eventIcons?.length > 0 && (
					<div className={subMenuItem.eventIcons[0]} />
				)}
				<img src={lobbyItemSrc} alt={`${_displayText}-bgimg`} />
				<div className="play-btn">
					<button
						className="now"
						onClick={() =>
							clickLobbyGame({
								tpId,
								gameId,
								tpGameType,
								isInMaintain
							})
						}
					>
						{t("lbl_PlayNow")}
					</button>
				</div>
			</div>
			<div className="lobby-item-text">{_displayText}</div>
			{isInMaintain ? (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			) : null}
		</div>
	);
};
export default LobbyListItem;

LobbyListItem.propTypes = {
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
