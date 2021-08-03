import React from "react";

export default ({ EditSearchField, searchInfo, submitSearch, t }) => {
	const EditField = e => {
		EditSearchField("searchText", e.target.value, e.key === "Enter");
	};

	const KeyPress = e => {
		if (e.key === "Enter") {
			EditSearchField("searchText", e.target.value, e.key === "Enter");
		}
	};

	return (
		<>
			<div className="inputBox">
				<i className="txt-blue12 icon icon-search" />
				<input
					type="text"
					onKeyPress={KeyPress}
					onChange={EditField}
					value={searchInfo.searchText}
					placeholder={t("lbl_SearchGames")}
				/>
			</div>
			<div className="btnGroup">
				<button className="btn-check" onClick={submitSearch}>
					{t("lbl_Submit")}
				</button>
			</div>
		</>
	);
};
