import React from "react";
import PropTypes from "prop-types";
import { defTpGameType } from "../../datas/productList";
import { bannerImgUrl } from "../../config";

const EsportList = ({ t, subMenu, allMaintainList, clickItem }) => {
	if (subMenu.length <= 0) return null;

	return subMenu.map(subMenuItem => {
		const isInMaintain = allMaintainList?.some(
			item =>
				item.tpId === subMenuItem.tpId &&
				(item.tpGameType === subMenuItem.tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

		return (
			<EsportListItem
				key={subMenuItem.displayKey}
				t={t}
				isInMaintain={isInMaintain}
				clickItem={clickItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

EsportList.propTypes = {
	t: PropTypes.func.isRequired,
	allMaintainList: PropTypes.arrayOf(PropTypes.any).isRequired,
	subMenu: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickItem: PropTypes.func.isRequired
};

export default EsportList;

const EsportListItem = ({ subMenuItem, isInMaintain, clickItem, t }) => {
	const { displayText, displayKey, tpId, gameId, imgSrc, tpGameType } =
		subMenuItem;
	const _displayText = displayText || t(displayKey);

	return (
		<div
			className={isInMaintain ? "active" : ""}
			onClick={() =>
				clickItem({
					tpId,
					gameId,
					isInMaintain,
					tpGameType
				})
			}>
			<img src={imgSrc} alt="esport" />
			<img
				className="light"
				src={`${bannerImgUrl}/desktop/img/esports/light.png`}
				alt="light"
			/>
			<div className="txt-darkBlue">{_displayText}</div>
			{isInMaintain && (
				<div className="maintenance">{t("lbl_underMaintenance")}</div>
			)}
		</div>
	);
};

EsportListItem.propTypes = {
	t: PropTypes.func.isRequired,
	isInMaintain: PropTypes.bool.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
