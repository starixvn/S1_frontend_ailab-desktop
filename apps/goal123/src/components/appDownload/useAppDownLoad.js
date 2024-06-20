import { useState, useEffect, useRef } from "react";
import { api_player_GetAppLink } from "../../service/api/player";
import usePopBox from "../hook/usePopBox";

export const useAppDownLoad = () => {
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();
	// 初始化為array但是fetch api之後set為object，因此這邊修正
	const [appLinkDatas, setAppLinkData] = useState({});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const fetchData = async () => {
			await api_player_GetAppLink()
				.then(res => {
					if (!isMountedRef.current) return;

					const { data, message, errorCode } = res.data;

					const success = errorCode === 0;

					if (success) {
						const newData = data.reduce((acc, cur) => {
							return { ...acc, [cur.appTypeName]: cur };
						}, {});

						setAppLinkData(newData);
					} else {
						errorPopBox(message || `error`, errorCode);
					}
				})
				.catch(() => {
					// 在首頁網路斷線時會進來這個 catch，故不特別做錯誤處理
				});
		};

		fetchData();
	}, []);
	return { appLinkDatas };
};
