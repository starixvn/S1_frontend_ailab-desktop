import React from "react";
import PropTypes from "prop-types";
import Dropdown from "../common/dropdown";

const LeaderboardDropdown = ({
	t,
	title,
	options,
	onSelectItem,
	selectedIdx
}) => (
	<div className="quickSelect">
		<div>
			<div className="txt-blue15">{title}</div>
			<div className="inputBox-blue">
				<Dropdown
					i18n={t}
					mainKey="beforeDay_"
					options={options}
					selectedIdx={selectedIdx}
					onSelectItem={onSelectItem}
					showDropDownIcon={true}
				/>
			</div>
		</div>
	</div>
);

LeaderboardDropdown.propTypes = {
	t: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.object).isRequired,
	onSelectItem: PropTypes.func.isRequired,
	selectedIdx: PropTypes.number.isRequired
};

export default LeaderboardDropdown;
