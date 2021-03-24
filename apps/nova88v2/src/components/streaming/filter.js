import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { defStreamingCategory } from "./defStreaming";

const Panel = ({ handleSelect, selected }) => {
	const { t } = useTranslation();
	const clickQuickSelect = type => {
		if (selected !== type) {
			handleSelect(type);
		}
	};

	const quickSelectArr = Object.values(defStreamingCategory).map(item => {
		return (
			<button
				key={`streaming-quickSelect-${item.displayKey}`}
				className={item.type === selected ? "active" : ""}
				onClick={clickQuickSelect.bind(this, item.type)}>
				{t(item.displayKey) ?? item.displayKey}
			</button>
		);
	});

	return (
		<div className="quickSelect">
			{quickSelectArr}
			<i className="icon icon-keyboard_arrow_right" />
		</div>
	);
};

Panel.propTypes = {
	handleSelect: PropTypes.func.isRequired
};

export default Panel;
