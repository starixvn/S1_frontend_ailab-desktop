import React from "react";
import Dropdown from "../common/dropdown";

export default ({
	tpOptions,
	EditSearchField,
	searchInfo,
	submitSearch,
	t
}) => {
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
			<div className="inputBox-blue">
				<i className="txt-blue12 icon icon-search" />
				<input
					type="text"
					onKeyPress={KeyPress}
					onChange={EditField}
					placeholder={t("lbl_SearchGames")}
					value={searchInfo.searchText}
				/>
			</div>
			<div className="btnGroup">
				<button className="orange" onClick={submitSearch}>
					{t("lbl_slot_submit")}
				</button>
			</div>
		</>
	);
};
