import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { api_video_GetLatestHighlightData } from "../../service/api/video";

const LatestVideo = () => {
	const [video, setVideo] = useState({});
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	useEffect(() => {
		let mounted = true;
		api_video_GetLatestHighlightData(userInfo.langId).then(res => {
			if (res.data.errorCode === 0 && mounted) {
				setVideo(res.data.data);
			}
		});

		return () => {
			mounted = false;
		};
	}, [userInfo.langId]);

	const title = video?.date
		? `${moment(video.date).format("MM/DD")} ${video.title}`
		: "";

	return video?.link ? (
		<div className="latestVideo">
			<div className="moduleTitle icon icon-film">
				{t("lbl_LatestHighlightVideo")}
			</div>
			<iframe
				width="100%"
				height="440"
				src={video.link}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="title">{title}</div>
		</div>
	) : null;
};

export default LatestVideo;
