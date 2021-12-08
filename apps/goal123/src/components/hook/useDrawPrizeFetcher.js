import { useState, useContext, useEffect } from "react";
import {
	api_events_CheckDrawPrize,
	api_events_DrawPrize,
	api_events_GetCustDrawPrizeList
} from "../../service/api/events";

import usePopBox from "./usePopBox";
import { userInfoContext, loadingContext } from "../common/context";

const defDrawPrizeStatus = {
	canJoin: 0,
	isJoin: 100,
	drawOut: 101,
	notEligible: 102
};

const useDrawPrizeFetcher = ({ defEventId, isMountedRef }) => {
	const [custDrawPrizeList, setCustDrawPrizeList] = useState([]);
	const [drawPrize, setDrawPrize] = useState({
		data: {},
		errorCode: null
	});
	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);

	const { errorPopBox } = usePopBox();

	const checkDrawPrize = async () => {
		if (!userInfo.isLogin) return;

		await api_events_CheckDrawPrize({ eventId: defEventId }).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, data, message } = res.data;

				setDrawPrize({ data, errorCode, message });
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	const postDrawPrize = async () => {
		let response = {};
		await api_events_DrawPrize({ eventId: defEventId }).then(
			res => {
				const { message, data, errorCode } = res.data;

				if (
					errorCode === 0 ||
					errorCode === defDrawPrizeStatus.isJoin
				) {
					setDrawPrize({
						data,
						errorCode: defDrawPrizeStatus.isJoin
					});

					getCustDrawPrizeList();
				} else {
					setDrawPrize({
						data,
						errorCode,
						message
					});
				}

				response = { errorCode, data, message };
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
		return response;
	};

	const getCustDrawPrizeList = async () => {
		if (!userInfo.isLogin) return;

		setLoading(true);

		await api_events_GetCustDrawPrizeList({ eventId: defEventId }).then(
			res => {
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setCustDrawPrizeList(res.data.data);
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);

		setLoading(false);
	};

	useEffect(() => {
		checkDrawPrize();
		getCustDrawPrizeList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		drawPrize,
		custDrawPrizeList,
		checkDrawPrize,
		postDrawPrize,
		getCustDrawPrizeList
	};
};

export { useDrawPrizeFetcher, defDrawPrizeStatus };
