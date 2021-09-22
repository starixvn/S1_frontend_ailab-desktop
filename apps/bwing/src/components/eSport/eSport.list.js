import React from "react";
import PropTypes from "prop-types";

const EsportList = ({ t, subMenu, allMaintainList, clickItem }) => {
	if (subMenu.length <= 0) return null;

	return subMenu.map(subMenuItem => {
		const isInMaintain = allMaintainList?.some(
			item =>
				item.tpId === subMenuItem.tpId &&
				item.tpGameType === subMenuItem.tpGameType
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
	const { displayText, displayKey, tpId, gameId, _class } = subMenuItem;

	const _displayText = displayText || t(displayKey);

	const _className = [_class, isInMaintain && "under"]
		.filter(Boolean)
		.join(" ");

	return (
		<div
			className={_className}
			onClick={() =>
				clickItem({
					tpId,
					gameId
				})
			}>
			{isInMaintain && (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			)}

			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={`icon ${subMenuItem.eventIcons[0]}`} />
			)}

			<p>{_displayText}</p>
		</div>
	);
};

EsportListItem.propTypes = {
	t: PropTypes.func.isRequired,
	isInMaintain: PropTypes.bool.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
