import React from "react";

export default ({ EditSearchField, searchInfo, t, activeProviderId }) => {
	const EditField = e => {
		EditSearchField("searchText", e.target.value, activeProviderId);
	};

	return (
		<div className="inputBox-blue">
			<i className="txt-blue12 icon icon-search" />
			<input
				type="text"
				onChange={EditField}
				placeholder={t("lbl_SearchGames")}
				value={searchInfo.searchText}
			/>
		</div>
	);
};
