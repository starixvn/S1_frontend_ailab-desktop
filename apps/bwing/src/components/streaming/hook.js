import { useState, useEffect } from "react";
import { api_video_GetLiveStreamingList } from "../../service/api/video";
import { defStreamingCategory } from "./defStreaming";
import usePopBox from "../hook/usePopBox";

const useGetVideo = ({ langId }) => {
	const { errorPopBox } = usePopBox();
	const [videoList, setVideoList] = useState([]);
	const [selCategory, setSelCategory] = useState({
		type: defStreamingCategory.FOOTBALL.type,
		tpId: defStreamingCategory.FOOTBALL.tpId,
		gameId: defStreamingCategory.FOOTBALL.gameId,
		datas: []
	});

	useEffect(() => {
		api_video_GetLiveStreamingList(langId).then(
			res => {
				if (res.data.errorCode === 0) {
					setVideoList(res.data.data);

					setSelCategory(prev => ({
						...prev,
						datas: res.data.data.filter(v => v.type === prev.type)
					}));
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				errorPopBox();
			}
		);
	}, [langId]);

	const handleSelectCategory = type => {
		setSelCategory({
			type,
			tpId: defStreamingCategory[type].tpId,
			gameId: defStreamingCategory[type].gameId,
			datas: videoList?.filter(v => v.type === type)
		});
	};

	return { videoList, selCategory, handleSelectCategory };
};

export default useGetVideo;
