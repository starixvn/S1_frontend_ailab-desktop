import React from "react";

export default ({ editSearchField, searchInfo, t }) => {
	return (
		<>
			<div className="inputBox-white">
				<i className="txt-blue12 icon icon-search" />
				<input
					type="text"
					onChange={e =>
						editSearchField("searchText", e.target.value)
					}
					placeholder={t("lbl_SearchGames")}
					value={searchInfo.searchText}
				/>
			</div>
		</>
	);
};
