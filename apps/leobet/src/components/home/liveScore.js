import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const LiveScore = ({ langId }) => {
	const { t } = useTranslation();
	const src =
		langId === "cs"
			? "https://www.sabasports.cn/?skin=5574a7"
			: "https://www.sabasports.com/category/board.html?v=1616562714078&skin=5574a7";
	return (
		<>
			<div className="moduleTitle">
				{t("lbl_LiveScore")?.toUpperCase()}
			</div>
			<div className="matches">
				<iframe
					title="live score"
					width="100%"
					src={src}
					frameBorder="0"
					id="mainframe"
				/>
			</div>
		</>
	);
};

LiveScore.defaultProps = {
	langId: null
};

LiveScore.propTypes = {
	langId: PropTypes.string
};

export default LiveScore;
