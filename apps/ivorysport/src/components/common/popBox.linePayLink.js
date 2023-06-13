import React from "react";
import PropTypes from "prop-types";
import { bannerImgUrl } from "../../config";

const LinePayLink = ({ linePayLink, langId, clickClose }) => (
	<div className="linepop">
		<i className="icon icon-close" onClick={clickClose} />
		<a href={linePayLink} target="_blank" rel="noreferrer">
			<img
				src={`${bannerImgUrl}/desktop/img/line/line-${
					langId === "th" ? "th" : "en"
				}.jpg`}
				alt=""
			/>
		</a>
	</div>
);

LinePayLink.defaultProps = {
	linePayLink: null,
	langId: null,
	clickClose: () => null
};

LinePayLink.propTypes = {
	linePayLink: PropTypes.string,
	langId: PropTypes.string,
	clickClose: PropTypes.func
};

export default LinePayLink;
