import React from "react";

export default ({ editSearchField, searchInfo, t }) => {
	return (
		<div className="slots-category-search">
			<button className="icon-search-org" />
			<div className="inputbox-group">
				<div className="inputbox-item">
					<input
						type="text"
						onChange={e =>
							editSearchField("searchText", e.target.value)
						}
						placeholder={t("lbl_SearchGames")}
						value={searchInfo.searchText}
					/>
				</div>
			</div>
		</div>
	);
};
