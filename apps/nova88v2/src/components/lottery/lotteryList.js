import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { bannerImgUrl } from "../../config";

const LotteryList = ({
	t,
	lotterySubMenu,
	tpGameTypeSettingList,
	clickItem
}) => {
	if (lotterySubMenu.length <= 0) return null;

	return lotterySubMenu.map(subMenuItem => {
		if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
			tpGameTypeSettingList.forEach(settingItem => {
				if (
					settingItem.gameType === subMenuItem.tpGameType &&
					settingItem.tpId === subMenuItem.tpId
				) {
					Object.assign(subMenuItem, settingItem);
				}
			});
		}
		if (subMenuItem?.noShow) return null;
		return (
			<LotteryListItem
				key={`${subMenuItem?.displayKey}-${subMenuItem?.tpId}-${subMenuItem?.gameId}`}
				t={t}
				subMenuItem={subMenuItem}
				clickItem={clickItem}
			/>
		);
	});
};

LotteryList.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	lotterySubMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	tpGameTypeSettingList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default LotteryList;

const LotteryListItem = ({ t, subMenuItem, clickItem }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		path,
		needLogin,
		lobbyPage: { bgImg },
		tpGameType,
		isInMaintain,
		noPlay
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const isNew = () => {
		if (
			subMenuItem.eventIcons &&
			subMenuItem.eventIcons[0] &&
			subMenuItem.eventIcons[0].match("new")
		) {
			return true;
		}

		return false;
	};

	return (
		<div
			className={classNames("lobby-content-item", {
				under: isInMaintain
			})}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					path,
					needLogin,
					isInMaintain,
					tpGameType,
					noPlay
				})
			}
		>
			{isInMaintain && (
				<div className="under-text">{t("lbl_underMaintenance")}</div>
			)}

			{isNew() && <div className="new-icon">{t("lbl_New")}</div>}

			<div className="img-wrapper">
				<img
					src={`${bannerImgUrl}/desktop/img/4.0/lobby-lottery/${bgImg}`}
					alt={bgImg}
				/>
				<div className="btn-container">
					<button>{t("lbl_PlayNow")}</button>
				</div>
			</div>
			<div className="lobby-title">{_displayText}</div>
		</div>
	);
};

LotteryListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
