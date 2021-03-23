import React from "react";
import Dropdown from "../common/dropdown";

export default ({
	tpOptions,
	categoryOptions,
	EditSearchField,
	onChangeCategory,
	searchInfo,
	category,
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
			<div className="inputBox-white">
				<i className="txt-blue12 icon icon-search" />
				<input
					type="text"
					onKeyPress={KeyPress}
					onChange={EditField}
					placeholder={t("lbl_SearchGames")}
					value={searchInfo.searchText}
				/>
			</div>

			<div>
				<div className="inputBox-white">
					<Dropdown
						mainkey="casino-provider"
						options={tpOptions}
						onSelectItem={EditSearchField.bind(this, "provider")}
						selectedIdx={searchInfo.provider.idx}
						i18n={t}
					/>
				</div>
			</div>
			<div>
				<div className="inputBox-white">
					<Dropdown
						mainkey="casino-gameType"
						options={categoryOptions}
						onSelectItem={onChangeCategory.bind(this, "category")}
						selectedIdx={category.category.idx}
						i18n={t}
					/>
				</div>
			</div>
			<div className="btnGroup">
				<button className="btn-check" onClick={submitSearch}>
					{t("lbl_Submit")}
				</button>
			</div>
		</>
	);
};
