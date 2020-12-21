import React from "react";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";

export const defPageSize = 10;

export const quickPickList = [
	{ id: 0, displayKey: "lbl_Today" },
	{ id: 1, displayKey: "lbl_YesterDay" },
	{ id: 2, displayKey: "lbl_ThisWeek" },
	{ id: 3, displayKey: "lbl_LastWeek" },
	{ id: 4, displayKey: "lbl_ThisMonth" }
];

const StatementSearchBox = ({
	t,
	onSetQuickPickType,
	quickPickType,
	submitSearch
}) => {
	return (
		<>
			<div className="quickSelect">
				<div>
					<div className="inputBox">
						<i className="txt-blue12">{t("lbl_QuickPick")}</i>
						<Dropdown
							mainkey="statement-provider"
							options={quickPickList}
							onSelectItem={onSetQuickPickType}
							selectedIdx={quickPickType}
							i18n={t}
						/>
					</div>
				</div>

				<div className="btnGroup">
					<button onClick={submitSearch} className="btn-check">
						{t("lbl_Submit")}
					</button>
				</div>
			</div>
		</>
	);
};

StatementSearchBox.propTypes = {
	t: PropTypes.func.isRequired,
	onSetQuickPickType: PropTypes.func.isRequired,
	quickPickType: PropTypes.number.isRequired,
	submitSearch: PropTypes.func.isRequired
};

export default StatementSearchBox;
