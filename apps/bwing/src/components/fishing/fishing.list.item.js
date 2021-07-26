import React from "react";
import PropTypes from "prop-types";

const FishingListItem = ({ t, clickItem, subMenuItem, maintainList }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgClass }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);
	const isInMaintain = maintainList?.some(item => item.tpId === tpId);

	return (
		<div className={`${bgClass} ${isInMaintain ? " under" : ""}`}>
			{isInMaintain ? (
				<div className="underBtn">{t("lbl_underMaintenance")}</div>
			) : null}
			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={subMenuItem.eventIcons[0]} />
			)}

			<p>{_displayText}</p>

			<div className="btnGroup">
				<button
					className="orange"
					onClick={() =>
						clickItem({
							tpId,
							gameId,
							isInMaintain
						})
					}>
					{t("lbl_Play")}
				</button>

				{/* <button className="blue">{t("lbl_Demo")}</button> */}
			</div>
		</div>
	);
};
export default FishingListItem;

FishingListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};
