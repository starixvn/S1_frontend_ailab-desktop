import { useState, useContext } from "react";
import {
	api_events_CheckDrawPrize,
	api_events_DrawPrize,
	api_events_GetCustDrawPrizeList
} from "../../../service/api/events";
import { defDrawPrizeStatus } from "../angPow.def";
import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";
import {
	userInfoContext,
	loadingContext,
	popBoxContext
} from "../../common/context";

const useDrawPrize = ({ isMountedRef }) => {
	const [drawPrizeList, setDrawPrizeList] = useState([]);
	const [drawPrize, setDrawPrize] = useState({
		data: {},
		errorCode: null
	});

	const { userInfo } = useContext(userInfoContext);
	const { setLoading } = useContext(loadingContext);
	const { setPopBox } = useContext(popBoxContext);

	const { errorPopBox, closePopBox } = usePopBox();

	const checkDrawPrize = () => {
		if (!userInfo.isLogin) return;

		api_events_CheckDrawPrize({ eventId: 0 }).then(
			res => {
				if (!isMountedRef) return;

				setDrawPrize({
					data: res.data.data,
					errorCode: res.data.errorCode
				});
			},
			() => {
				if (!isMountedRef) return;

				errorPopBox();
			}
		);
	};

	const postDrawPrize = () => {
		if (!userInfo.isLogin)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});

		if (drawPrize.errorCode === defDrawPrizeStatus.isJoin) return;

		setLoading(true);

		return api_events_DrawPrize({ eventId: 0 }).then(
			res => {
				setLoading(false);

				if (!isMountedRef) return;
				const { errorCode, data, message } = res.data;

				if (errorCode !== 0) {
					setDrawPrize({
						data,
						errorCode
					});
					setPopBox({
						isOpen: true,
						t,
						drawPrizeDatas: data,
						popBoxType: defPopBoxType.SuccessAngPow,
						closePopBox
					});
				} else if (errorCode === 100) {
					checkDrawPrize();
				} else if (errorCode === 102) {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				setLoading(false);

				if (!isMountedRef) return;
				errorPopBox();
			}
		);
	};

	const getCustDrawPrizeList = async () => {
		setLoading(true);

		if (!userInfo.isLogin) {
			setDrawPrizeList([]);
			setLoading(false);
			return;
		}

		await api_events_GetCustDrawPrizeList({ eventId: 0 }).then(
			res => {
				setLoading(false);

				if (!isMountedRef) return;
				if (res.data.errorCode === 0) {
					setDrawPrizeList(res.data.data);
				} else {
					errorPopBox(res.data.message || "error", errorCode);
				}
			},
			() => {
				setLoading(false);

				if (!isMountedRef) return;
				errorPopBox();
			}
		);
	};

	return {
		drawPrize,
		drawPrizeList,
		checkDrawPrize,
		postDrawPrize,
		getCustDrawPrizeList
	};
};

export default useDrawPrize;
