import React, { useState, useEffect, useContext, memo } from "react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import { api_video_GetLatestHighlightData } from "../../service/api/video";
import usePopBox from "../hook/usePopBox";

const LatestVideo = memo(() => {
	const [video, setVideo] = useState({});
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();

	useEffect(() => {
		let mounted = true;
		if (userInfo.langId) {
			api_video_GetLatestHighlightData(userInfo.langId).then(
				res => {
					if (res.data.errorCode === 0 && mounted) {
						setVideo(res.data.data);
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				},
				() => {
					if (mounted) {
						errorPopBox();
					}
				}
			);
		}

		return () => {
			mounted = false;
		};
	}, [userInfo.langId]);

	return video?.link ? (
		<div className="latestVideo">
			<div className="moduleTitle">{t("lbl_LatestHighlightVideo")}</div>
			<iframe
				width="100%"
				height="440"
				src={video.link}
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/>
			<div className="title">{video.title}</div>
		</div>
	) : (
		<div className="latestVideo" />
	);
});

export default LatestVideo;
