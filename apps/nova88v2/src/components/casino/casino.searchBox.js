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
	return (
		<>
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
			<div className="inputBox-white">
				<i className="txt-blue12 icon icon-search" />
				<input
					type="text"
					onChange={e =>
						EditSearchField("searchText", e.target.value)
					}
					placeholder={t("lbl_SearchGames")}
					value={searchInfo.searchText}
				/>
			</div>
		</>
	);
};
