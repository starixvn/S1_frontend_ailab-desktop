import React from "react";
import PropTypes from "prop-types";

const FishingListItem = ({ t, clickItem, subMenuItem }) => {
	const {
		displayText,
		displayKey,
		tpId,
		gameId,
		iconImgUrl,
		lobbyPage: { bgImg }
	} = subMenuItem;

	const _displayText = displayText || t(displayKey);

	return (
		<div>
			<div className="brand">
				<img src={iconImgUrl} alt={`${_displayText}-icon`} />
			</div>

			<img src={bgImg} alt={`${_displayText}-bgimg`} />

			<div className="txt-darkBlue">{_displayText}</div>

			<div className="mask">
				<button
					onClick={() =>
						clickItem({
							tpId,
							gameId
						})
					}>
					{t("lbl_Play")}
				</button>

				{/* <button>{t("lbl_Demo")}</button> */}
			</div>

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
	subMenuItem: PropTypes.objectOf(PropTypes.any).isRequired
};
