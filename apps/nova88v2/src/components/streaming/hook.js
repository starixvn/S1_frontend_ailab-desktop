import { useState, useEffect } from "react";
import { defStreamingCategory } from "./defStreaming";
import { api_video_GetLiveStreamingList } from "../../service/api/video";

export const useGetVideo = ({ langId }) => {
	const [videoList, setVideoList] = useState([]);
	const [selCategory, setSelCategory] = useState({
		type: defStreamingCategory.FOOTBALL.type,
		datas: []
	});

	useEffect(() => {
		api_video_GetLiveStreamingList(langId).then(res => {
			if (res.data.errorCode === 0) {
				setVideoList(res.data.data);
				setSelCategory(prev => ({
					...prev,
					datas: res.data.data.filter(v => v.type === prev.type)
				}));
			}
		});
	}, [langId]);

	const handleSelectCategory = type => {
		setSelCategory({
			type,
			datas: videoList?.filter(v => v.type === type)
		});
	};

	return { selCategory, handleSelectCategory };
};
