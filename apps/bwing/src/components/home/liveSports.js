import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import HomeStreaming from "./homeStreaming";
import StreamingNoData from "./streamingNoData";

const LiveSports = ({ videoList }) => {
	const { t } = useTranslation();
	return (
		<div className="col-5">
			<div className="home-title">
				<i className="icon-livesports" />
				{t("lbl_Sports")}
			</div>
			<div className="home-livesports mb-6">
				{videoList?.map(item => (
					<HomeStreaming
						key={`${item.name}-${item.league}-${item.channel}`}
						{...item}
					/>
				))}
				{videoList.length === 0 && <StreamingNoData />}
			</div>
		</div>
	);
};
LiveSports.defaultProps = {
	videoList: []
};

LiveSports.propTypes = {
	videoList: PropTypes.arrayOf(PropTypes.any)
};

export default LiveSports;
