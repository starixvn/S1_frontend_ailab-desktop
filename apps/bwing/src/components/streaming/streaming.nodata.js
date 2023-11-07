import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl } from "../../config";

const StreamingNodata = ({ className }) => {
	const { t } = useTranslation();
	return (
		<div className={`notv ${className}`}>
			<img
				src={`${bannerImgUrl}/desktop/img/notvicon.png`}
				alt="imgNotvicon"
			/>
			<p>
				{t("lbl_Streaming_NoData1")} <br />
				{t("lbl_Streaming_NoData2")}
			</p>
		</div>
	);
};

export default StreamingNodata;

StreamingNodata.defaultProps = {
	className: ""
};

StreamingNodata.propTypes = {
	className: PropTypes.string
};
