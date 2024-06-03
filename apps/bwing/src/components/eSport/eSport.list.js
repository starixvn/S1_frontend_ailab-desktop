import React from "react";
import PropTypes from "prop-types";
import { menuIconTypeEnum } from "@ailab-desktop/common";
import ESportListItem from "./eSportListItem";

export const eSportLobbyIconEnum = Object.freeze({
	[menuIconTypeEnum.Null]: null,
	[menuIconTypeEnum.New]: <div className="tag-new-pop" />
});

const ESportList = ({ eSportSubMenus = [], onclickESportItem }) => {
	if (eSportSubMenus.length === 0) return null;

	return eSportSubMenus.map(subMenuItem => {
		return (
			<ESportListItem
				key={subMenuItem?.tpGameIdNo}
				onclickESportItem={onclickESportItem}
				subMenuItem={subMenuItem}
			/>
		);
	});
};

ESportList.propTypes = {
	eSportSubMenus: PropTypes.arrayOf(PropTypes.any).isRequired,
	onclickESportItem: PropTypes.func.isRequired
};

export default ESportList;
