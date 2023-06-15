import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PopBox = ({
	icon = "icon icon-bell",
	btnBar,
	description = null,
	title
}) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className={icon} />

			<div className="title">{title ?? t("lbl_Information")}</div>

			{description}

			{btnBar}
		</div>
	);
};

PopBox.defaultProps = {
	icon: null,
	btnBar: null,
	description: null,
	title: null
};

PopBox.propTypes = {
	icon: PropTypes.string,
	btnBar: PropTypes.node,
	description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	title: PropTypes.string
};

export default PopBox;
