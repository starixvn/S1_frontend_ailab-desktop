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
			// eslint-disable-next-line jsx-a11y/anchor-is-valid
			<a
				className={`menuSelect${
					item.type === selected ? " active" : ""
				}`}
				key={`menuSelect-${item.displayKey}`}
				onClick={clickQuickSelect.bind(this, item.type)}>
				<span>{t(item.displayKey) ?? item.displayKey}</span>
			</a>
		);
	});

	return <div className="menuModule">{quickSelectArr}</div>;
};

Panel.propTypes = {
	handleSelect: PropTypes.func.isRequired,
	selected: PropTypes.string.isRequired
};

export default Panel;
