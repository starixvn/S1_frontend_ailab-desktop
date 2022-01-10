import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const FishingListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgImg, providerImg },
		tpGameType
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(
		item =>
			item.tpId === tpId &&
			(item.tpGameType === tpGameType ||
				item.tpGameType === defTpGameType.All)
	);

	return (
		<div
			className={isInMaintain ? "active" : ""}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					tpGameType,
					isInMaintain
				})
			}>
			<div className="brand">
				<img
					src={`${bannerImgUrl}/desktop/img/fishing/icon/${providerImg}.png`}
					alt={`${_displayText}-icon`}
				/>
			</div>

			<img src={bgImg} alt={`${_displayText}-bgimg`} />

			<div className="txt-darkBlue">{_displayText}</div>

			{isInMaintain ? (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			) : null}
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}
		</div>
	);
};
export default FishingListItem;

FishingListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.object).isRequired
};
