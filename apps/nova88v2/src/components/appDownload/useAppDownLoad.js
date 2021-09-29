import { useState, useEffect, useRef } from "react";
import { api_player_GetAppLink } from "../../service/api/player";
import usePopBox from "../hook/usePopBox";

const useAppDownLoad = () => {
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();

	const [appLinkDatas, setAppLinkData] = useState([]);

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
						errorPopBox(
							message || `[${errorCode}] error`,
							errorCode
						);
					}
				})
				.catch(() => {
					if (!isMountedRef.current) return;

					errorPopBox();
				});
		};

		fetchData();
	}, []);
	return { appLinkDatas };
};

export default useAppDownLoad;
