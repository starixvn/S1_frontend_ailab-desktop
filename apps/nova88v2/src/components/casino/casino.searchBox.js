import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

export const SearchBox = ({ editSearchField, searchInfo }) => {
	const { t } = useTranslation();
	return (
		<div className="search-bar">
			<img
				src={`${bannerImgUrl}/desktop/img/4.0/lobby-slots/search-icon.png`}
				alt=""
			/>
			<input
				className="search-input"
				type="text"
				placeholder={t("lbl_SearchGames")}
				onChange={e => editSearchField("searchText", e.target.value)}
				value={searchInfo.searchText}
			/>
		</div>
	);
};

SearchBox.propTypes = {
	editSearchField: PropTypes.func.isRequired,
	searchInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
