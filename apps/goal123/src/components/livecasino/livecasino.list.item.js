import React from "react";
import PropTypes from "prop-types";

const LiveCasinoListItem = ({ t, clickItem, subMenuItem }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		lobbyPage: { bgImg, iconImg }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	return (
		<div>
			<div className="brand">
				<img src={iconImg} alt={`${_displayText}-icon`} />
			</div>

			<img src={bgImg} alt={`${_displayText}-bgimg`} />

			<div className="txt-darkBlue">{_displayText}</div>

			<div className="mask">
				<button
					className="blue"
					onClick={() =>
						clickItem({
							tpId,
							gameId
						})
					}>
					{t("lbl_Play")}
				</button>
			</div>

			{subMenuItem?.eventIcons?.length > 0 && (
				<div className={`icon ${subMenuItem.eventIcons[0]}`} />
			)}
		</div>
	);
};

export default LiveCasinoListItem;

LiveCasinoListItem.propTypes = {
	t: PropTypes.func.isRequired,
	clickItem: PropTypes.func.isRequired,
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
